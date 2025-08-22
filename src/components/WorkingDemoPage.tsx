import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FlaskConical, 
  Upload, 
  FileText, 
  Image, 
  File, 
  Loader2, 
  CheckCircle, 
  User, 
  CreditCard,
  XCircle,
  X,
  Eye
} from "lucide-react";

interface ProcessedClaim {
  status: string;
  fromEmail: string;
  subject: string;
  body: string;
  structuredData: {
    claimant: string;
    policyNumber: string;
    categories: {
      medicines?: number;
      labs?: number;
      opd?: number;
      others?: number;
    };
    total: number;
  };
  attachments: Array<{
    name: string;
    url: string;
    type: string;
  }>;
}

interface FileUpload {
  prescription: File[];
  hospitalBills: File[];
  medicineBills: File[];
  labBills: File[];
}

interface UploadStatus {
  prescription: 'pending' | 'uploading' | 'success' | 'error';
  hospitalBills: 'pending' | 'uploading' | 'success' | 'error';
  medicineBills: 'pending' | 'uploading' | 'success' | 'error';
  labBills: 'pending' | 'uploading' | 'success' | 'error';
}

export const WorkingDemoPage = () => {
  const [formData, setFormData] = useState({
    fromEmail: "",
    subject: "",
    body: ""
  });
  
  const [fileUploads, setFileUploads] = useState<FileUpload>({
    prescription: [],
    hospitalBills: [],
    medicineBills: [],
    labBills: []
  });

  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
    prescription: 'pending',
    hospitalBills: 'pending',
    medicineBills: 'pending',
    labBills: 'pending'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [processedClaim, setProcessedClaim] = useState<ProcessedClaim | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});

  const fileInputRefs = {
    prescription: useRef<HTMLInputElement>(null),
    hospitalBills: useRef<HTMLInputElement>(null),
    medicineBills: useRef<HTMLInputElement>(null),
    labBills: useRef<HTMLInputElement>(null)
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (category: keyof FileUpload, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFileUploads(prev => ({
        ...prev,
        [category]: [...prev[category], ...filesArray]
      }));
    }
  };

  const removeFile = (category: keyof FileUpload, index: number) => {
    setFileUploads(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index)
    }));
  };

  const uploadFiles = async (category: keyof FileUpload, files: File[]): Promise<boolean> => {
    if (files.length === 0) return true;

    setUploadStatus(prev => ({ ...prev, [category]: 'uploading' }));
    
    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
        formData.append('category', category);
      });

      // Simulate API call to /upload endpoint
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setUploadStatus(prev => ({ ...prev, [category]: 'success' }));
        return true;
      } else {
        setUploadStatus(prev => ({ ...prev, [category]: 'error' }));
        return false;
      }
    } catch (error) {
      setUploadStatus(prev => ({ ...prev, [category]: 'error' }));
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);
    setProcessedClaim(null);

    try {
      // Upload all files first
      const uploadResults = await Promise.all([
        uploadFiles('prescription', fileUploads.prescription),
        uploadFiles('hospitalBills', fileUploads.hospitalBills),
        uploadFiles('medicineBills', fileUploads.medicineBills),
        uploadFiles('labBills', fileUploads.labBills)
      ]);

      // Check if all uploads were successful
      if (uploadResults.some(result => !result)) {
        throw new Error("Some file uploads failed. Please try again.");
      }

      // Simulate AI processing with 2-second delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate AI processing based on form data and uploaded files
      const simulatedClaim = simulateAIProcessing(formData, fileUploads);
      setProcessedClaim(simulatedClaim);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process claim. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const simulateAIProcessing = (data: any, files: FileUpload): ProcessedClaim => {
    // Extract information from uploaded files to make it feel realistic
    const extractedData = extractDataFromFiles(files);
    
    return {
      status: "processed",
      fromEmail: data.fromEmail,
      subject: data.subject,
      body: data.body,
      structuredData: {
        claimant: extractDataFromEmail(data.fromEmail),
        policyNumber: generatePolicyNumber(),
        categories: {
          medicines: extractedData.medicines || Math.floor(Math.random() * 5000) + 1000,
          labs: extractedData.labs || Math.floor(Math.random() * 8000) + 2000,
          opd: extractedData.opd || Math.floor(Math.random() * 3000) + 500,
          others: extractedData.others || Math.floor(Math.random() * 2000) + 500
        },
        total: 0
      },
      attachments: [
        ...files.prescription.map(file => ({
          name: file.name,
          url: URL.createObjectURL(file),
          type: file.type
        })),
        ...files.hospitalBills.map(file => ({
          name: file.name,
          url: URL.createObjectURL(file),
          type: file.type
        })),
        ...files.medicineBills.map(file => ({
          name: file.name,
          url: URL.createObjectURL(file),
          type: file.type
        })),
        ...files.labBills.map(file => ({
          name: file.name,
          url: URL.createObjectURL(file),
          type: file.type
        }))
      ]
    };
  };

  const extractDataFromFiles = (files: FileUpload) => {
    const data: any = {};
    
    // Extract data from medicine bills
    if (files.medicineBills.length > 0) {
      data.medicines = Math.floor(Math.random() * 5000) + 1000;
    }
    
    // Extract data from lab bills
    if (files.labBills.length > 0) {
      data.labs = Math.floor(Math.random() * 8000) + 2000;
    }
    
    // Extract data from hospital bills (OPD)
    if (files.hospitalBills.length > 0) {
      data.opd = Math.floor(Math.random() * 3000) + 500;
    }
    
    // Extract data from prescription (others)
    if (files.prescription.length > 0) {
      data.others = Math.floor(Math.random() * 2000) + 500;
    }
    
    return data;
  };

  const extractDataFromEmail = (email: string): string => {
    const namePart = email.split('@')[0];
    return namePart
      .split(/[._-]/)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  };

  const generatePolicyNumber = (): string => {
    const prefix = Math.random() > 0.5 ? 'HMP' : 'VCL';
    const year = '2024';
    const number = Math.floor(Math.random() * 999) + 1;
    return `${prefix}-${year}-${number.toString().padStart(3, '0')}`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ne-NP', {
      style: 'currency',
      currency: 'NPR',
      minimumFractionDigits: 0
    }).format(amount).replace('NPR', 'Rs');
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return Image;
    if (type === 'application/pdf') return FileText;
    return File;
  };

  const calculateTotal = (categories: any): number => {
    return Object.values(categories).reduce((sum: number, value: any) => sum + (Number(value) || 0), 0);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <div className="w-4 h-4 rounded-full bg-gray-300" />;
      case 'uploading':
        return <Loader2 className="w-4 h-4 animate-spin text-blue-600" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <div className="w-4 h-4 rounded-full bg-gray-300" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'uploading':
        return 'Uploading...';
      case 'success':
        return 'Uploaded';
      case 'error':
        return 'Failed';
      default:
        return 'Pending';
    }
  };

  const resetForm = () => {
    setFormData({ fromEmail: "", subject: "", body: "" });
    setFileUploads({
      prescription: [],
      hospitalBills: [],
      medicineBills: [],
      labBills: []
    });
    setUploadStatus({
      prescription: 'pending',
      hospitalBills: 'pending',
      medicineBills: 'pending',
      labBills: 'pending'
    });
    setProcessedClaim(null);
    setError(null);
    setUploadProgress({});
    
    // Clear all file inputs
    Object.values(fileInputRefs).forEach(ref => {
      if (ref.current) ref.current.value = '';
    });
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-3">
            <FlaskConical className="h-8 w-8 text-purple-600" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Working Demo</h1>
              <p className="text-muted-foreground">
                Experience AI-powered claim processing with email submission and invoice analysis
              </p>
            </div>
          </div>
        </div>

        {/* Demo Form */}
        <Card>
          <CardHeader>
            <CardTitle>Submit Claim for AI Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* From Email */}
              <div className="space-y-2">
                <Label htmlFor="fromEmail">From Email</Label>
                <Input
                  id="fromEmail"
                  name="fromEmail"
                  type="email"
                  placeholder="customer@example.com"
                  value={formData.fromEmail}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Medical Claim for June"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Email Body */}
              <div className="space-y-2">
                <Label htmlFor="body">Email Body</Label>
                <Textarea
                  id="body"
                  name="body"
                  placeholder="Please find attached medical bills for claim settlement..."
                  value={formData.body}
                  onChange={handleInputChange}
                  rows={4}
                  required
                />
              </div>

              {/* File Upload Sections */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Document Uploads</h3>
                
                {/* Prescription */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="prescription">Prescription</Label>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(uploadStatus.prescription)}
                      <span className="text-sm text-muted-foreground">
                        {getStatusText(uploadStatus.prescription)}
                      </span>
                    </div>
                  </div>
                  <Input
                    id="prescription"
                    ref={fileInputRefs.prescription}
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => handleFileChange('prescription', e)}
                    className="cursor-pointer"
                  />
                  {fileUploads.prescription.length > 0 && (
                    <div className="space-y-2">
                      {fileUploads.prescription.map((file, index) => {
                        const Icon = getFileIcon(file.type);
                        return (
                          <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                            <Icon className="h-4 w-4 text-blue-600" />
                            <span className="text-sm flex-1">{file.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({(file.size / 1024).toFixed(1)} KB)
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile('prescription', index)}
                              className="h-6 w-6 p-0"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Hospital Bills */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="hospitalBills">Hospital/Doctor Bills</Label>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(uploadStatus.hospitalBills)}
                      <span className="text-sm text-muted-foreground">
                        {getStatusText(uploadStatus.hospitalBills)}
                      </span>
                    </div>
                  </div>
                  <Input
                    id="hospitalBills"
                    ref={fileInputRefs.hospitalBills}
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => handleFileChange('hospitalBills', e)}
                    className="cursor-pointer"
                  />
                  {fileUploads.hospitalBills.length > 0 && (
                    <div className="space-y-2">
                      {fileUploads.hospitalBills.map((file, index) => {
                        const Icon = getFileIcon(file.type);
                        return (
                          <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                            <Icon className="h-4 w-4 text-green-600" />
                            <span className="text-sm flex-1">{file.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({(file.size / 1024).toFixed(1)} KB)
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile('hospitalBills', index)}
                              className="h-6 w-6 p-0"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Medicine Bills */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="medicineBills">Medicine Bills</Label>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(uploadStatus.medicineBills)}
                      <span className="text-sm text-muted-foreground">
                        {getStatusText(uploadStatus.medicineBills)}
                      </span>
                    </div>
                  </div>
                  <Input
                    id="medicineBills"
                    ref={fileInputRefs.medicineBills}
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => handleFileChange('medicineBills', e)}
                    className="cursor-pointer"
                  />
                  {fileUploads.medicineBills.length > 0 && (
                    <div className="space-y-2">
                      {fileUploads.medicineBills.map((file, index) => {
                        const Icon = getFileIcon(file.type);
                        return (
                          <div key={index} className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg">
                            <Icon className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm flex-1">{file.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({(file.size / 1024).toFixed(1)} KB)
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile('medicineBills', index)}
                              className="h-6 w-6 p-0"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Lab Bills */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="labBills">Lab Bills</Label>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(uploadStatus.labBills)}
                      <span className="text-sm text-muted-foreground">
                        {getStatusText(uploadStatus.labBills)}
                      </span>
                    </div>
                  </div>
                  <Input
                    id="labBills"
                    ref={fileInputRefs.labBills}
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => handleFileChange('labBills', e)}
                    className="cursor-pointer"
                  />
                  {fileUploads.labBills.length > 0 && (
                    <div className="space-y-2">
                      {fileUploads.labBills.map((file, index) => {
                        const Icon = getFileIcon(file.type);
                        return (
                          <div key={index} className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
                            <Icon className="h-4 w-4 text-purple-600" />
                            <span className="text-sm flex-1">{file.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({(file.size / 1024).toFixed(1)} KB)
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile('labBills', index)}
                              className="h-6 w-6 p-0"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isProcessing}
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing with AI...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Submit for Processing
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Processing Results */}
        {isProcessing && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6 text-center">
              <Loader2 className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                AI Processing in Progress
              </h3>
              <p className="text-blue-700">
                Analyzing email content and extracting data from attachments...
              </p>
            </CardContent>
          </Card>
        )}

        {/* Error Display */}
        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-red-800">
                <XCircle className="h-5 w-5" />
                <span className="font-medium">{error}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Processed Results */}
        {processedClaim && (
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <CardTitle className="text-green-800">Successfully Processed!</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Status Banner */}
              <div className="p-4 bg-green-100 rounded-lg border border-green-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-800">
                    AI has successfully extracted structured data from your submission
                  </span>
                </div>
              </div>

              {/* Structured Data */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Extracted Claim Data</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Claimant</p>
                      <p className="font-medium">{processedClaim.structuredData.claimant}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Policy Number</p>
                      <p className="font-medium">{processedClaim.structuredData.policyNumber}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Expense Categories */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Expense Breakdown</h4>
                  <div className="space-y-2">
                    {processedClaim.structuredData.categories.medicines && (
                      <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                        <span className="text-sm font-medium">Medicines</span>
                        <span className="font-bold text-blue-800">
                          {formatCurrency(processedClaim.structuredData.categories.medicines)}
                        </span>
                      </div>
                    )}
                    
                    {processedClaim.structuredData.categories.labs && (
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span className="text-sm font-medium">Laboratory</span>
                        <span className="font-bold text-green-800">
                          {formatCurrency(processedClaim.structuredData.categories.labs)}
                        </span>
                      </div>
                    )}
                    
                    {processedClaim.structuredData.categories.opd && (
                      <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                        <span className="text-sm font-medium">OPD</span>
                        <span className="font-bold text-yellow-800">
                          {formatCurrency(processedClaim.structuredData.categories.opd)}
                        </span>
                      </div>
                    )}
                    
                    {processedClaim.structuredData.categories.others && (
                      <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                        <span className="text-sm font-medium">Others</span>
                        <span className="font-bold text-purple-800">
                          {formatCurrency(processedClaim.structuredData.categories.others)}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
                    <span className="text-lg font-semibold">Total Amount</span>
                    <span className="text-2xl font-bold text-foreground">
                      {formatCurrency(calculateTotal(processedClaim.structuredData.categories))}
                    </span>
                  </div>
                </div>
              </div>

              {/* Attachments Preview */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Processed Attachments</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {processedClaim.attachments.map((attachment, index) => {
                    const Icon = getFileIcon(attachment.type);
                    return (
                      <div key={index} className="p-4 bg-white rounded-lg border">
                        <div className="flex items-center gap-3">
                          <Icon className="h-8 w-8 text-blue-600" />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{attachment.name}</p>
                            <p className="text-xs text-muted-foreground capitalize">
                              {attachment.type.split('/')[1]}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reset Button */}
              <div className="pt-4">
                <Button 
                  variant="outline" 
                  onClick={resetForm}
                  className="w-full"
                >
                  Process Another Claim
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}; 