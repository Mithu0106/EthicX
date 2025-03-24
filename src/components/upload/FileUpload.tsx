
import React, { useState, useRef } from 'react';
import { Upload, FileText, X, Check, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
  
  return (
    <div className="w-full">
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
      
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-gray-500">
        <p>Accepted file types: .csv, .xlsx, .xls</p>
        <p>Maximum file size: 10MB</p>
      </div>
    </div>
  );
};

export default FileUpload;
