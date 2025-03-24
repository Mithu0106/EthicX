
import React, { useState, useRef } from 'react';
import { Upload, FileText, X, Check, AlertTriangle, Globe, Key } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [testingApi, setTestingApi] = useState(false);
  const [apiTestResults, setApiTestResults] = useState<{success: boolean, message: string} | null>(null);
  
  const acceptedFileTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // xlsx
    'application/vnd.ms-excel', // xls
    'text/csv', // csv
  ];
  
  // Handlers for drag events
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length === 0) return;
    
    const selectedFile = droppedFiles[0];
    
    if (!acceptedFileTypes.includes(selectedFile.type)) {
      toast.error('Invalid file type. Please upload CSV or Excel files only.');
      return;
    }
    
    setFile(selectedFile);
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const selectedFile = e.target.files[0];
    
    if (!acceptedFileTypes.includes(selectedFile.type)) {
      toast.error('Invalid file type. Please upload CSV or Excel files only.');
      return;
    }
    
    setFile(selectedFile);
  };
  
  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            toast.success('File uploaded successfully');
            if (file) {
              onFileUpload(file);
            }
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  const testApiConnection = async () => {
    if (!apiEndpoint) {
      toast.error('Please enter an API endpoint');
      return;
    }

    setTestingApi(true);
    setApiTestResults(null);

    try {
      // Simulate API testing with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate success (in a real app, this would be an actual API call)
      const success = Math.random() > 0.3; // 70% chance of success for demo purposes
      
      if (success) {
        setApiTestResults({
          success: true,
          message: 'Connection successful! API is working properly.'
        });
        toast.success('API connection test passed');
      } else {
        setApiTestResults({
          success: false,
          message: 'Connection failed. Please check your endpoint and API key.'
        });
        toast.error('API connection test failed');
      }
    } catch (error) {
      setApiTestResults({
        success: false,
        message: 'Error testing connection: ' + (error instanceof Error ? error.message : 'Unknown error')
      });
      toast.error('Error testing API connection');
    } finally {
      setTestingApi(false);
    }
  };
  
  return (
    <div className="w-full">
      <Tabs defaultValue="file" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="file" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            File Upload
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            API Connection
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="file" className="mt-0">
          <div 
            className={`
              w-full border-2 border-dashed rounded-xl p-8 transition-all duration-200 
              ${isDragging ? 'border-primary bg-blue-50' : 'border-gray-200 bg-gray-50'} 
              ${file ? 'bg-white' : ''}
            `}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {!file ? (
              <div className="flex flex-col items-center justify-center py-4">
                <div className="p-3 rounded-full bg-blue-100">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-medium">Upload your file</h3>
                <p className="mt-2 text-sm text-gray-500 text-center">
                  Drag and drop your CSV or Excel file here, or click to browse
                </p>
                <button
                  type="button"
                  className="mt-4 btn-secondary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Browse Files
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                  className="hidden"
                  accept=".csv,.xlsx,.xls"
                />
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-md bg-blue-100">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium truncate max-w-[200px] sm:max-w-xs">{file.name}</p>
                      <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                  </div>
                  
                  {!isUploading ? (
                    <button
                      type="button"
                      className="p-1 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                      onClick={handleRemoveFile}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <p className="text-xs font-medium text-gray-700">{uploadProgress}%</p>
                      {uploadProgress < 100 ? (
                        <AlertTriangle className="h-4 w-4 text-amber-500 animate-pulse" />
                      ) : (
                        <Check className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  )}
                </div>
                
                {isUploading && (
                  <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-primary h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
                
                {!isUploading && (
                  <button
                    type="button"
                    className="mt-4 btn-primary self-end"
                    onClick={simulateUpload}
                  >
                    Upload
                  </button>
                )}
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="api" className="mt-0">
          <div className="w-full border-2 rounded-xl p-8 bg-white">
            <div className="flex flex-col space-y-4">
              <div>
                <label htmlFor="api-endpoint" className="block text-sm font-medium text-gray-700 mb-1">
                  API Endpoint
                </label>
                <div className="flex">
                  <Input
                    id="api-endpoint"
                    type="text"
                    placeholder="https://api.example.com/data"
                    value={apiEndpoint}
                    onChange={(e) => setApiEndpoint(e.target.value)}
                    className="flex-grow"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="api-key" className="block text-sm font-medium text-gray-700 mb-1">
                  API Key (Optional)
                </label>
                <div className="flex">
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="Enter your API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="flex-grow"
                  />
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="ml-2">
                        <Key className="h-4 w-4 mr-1" />
                        Help
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>About API Keys</DialogTitle>
                      </DialogHeader>
                      <div className="text-sm text-gray-600 space-y-3">
                        <p>
                          API keys are unique identifiers that authenticate your requests to the API service.
                        </p>
                        <p>
                          You can typically find your API key in your account settings of the service you're 
                          connecting to. Keep your API key secure and never share it publicly.
                        </p>
                        <p>
                          If your API doesn't require authentication, you can leave this field empty.
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              
              {apiTestResults && (
                <div className={`p-4 rounded-md mt-4 ${apiTestResults.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <div className="flex items-start">
                    {apiTestResults.success ? (
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                    )}
                    <div>
                      <p className={`font-medium ${apiTestResults.success ? 'text-green-800' : 'text-red-800'}`}>
                        {apiTestResults.success ? 'Success' : 'Error'}
                      </p>
                      <p className="text-sm mt-1">
                        {apiTestResults.message}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <Button 
                onClick={testApiConnection}
                disabled={testingApi}
                className="self-end mt-2"
              >
                {testingApi ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    Testing...
                  </>
                ) : (
                  'Test Connection'
                )}
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-gray-500">
        <p>Accepted file types: .csv, .xlsx, .xls</p>
        <p>Maximum file size: 10MB</p>
      </div>
    </div>
  );
};

export default FileUpload;
