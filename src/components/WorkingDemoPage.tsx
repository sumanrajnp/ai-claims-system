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
  XCircle
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

export const WorkingDemoPage = () => {
  const [formData, setFormData] = useState({
    fromEmail: "",
    subject: "",
    body: ""
  });
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedClaim, setProcessedClaim] = useState<ProcessedClaim | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setAttachments(filesArray);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);
    setProcessedClaim(null);

    try {
      // Simulate API call with 2-second delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate AI processing based on form data and attachments
      const simulatedClaim = simulateAIProcessing(formData, attachments);
      setProcessedClaim(simulatedClaim);
    } catch (err) {
      setError("Failed to process claim. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const simulateAIProcessing = (data: any, files: File[]): ProcessedClaim => {
    // Extract some information from filenames to make it feel realistic
    const extractedData = extractDataFromFilenames(files);
    
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
      attachments: files.map(file => ({
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type
      }))
    };
  };

  const extractDataFromFilenames = (files: File[]) => {
    const data: any = {};
    
    files.forEach(file => {
      const filename = file.name.toLowerCase();
      if (filename.includes('medicine') || filename.includes('pharmacy')) {
        data.medicines = Math.floor(Math.random() * 5000) + 1000;
      } else if (filename.includes('lab') || filename.includes('test')) {
        data.labs = Math.floor(Math.random() * 8000) + 2000;
      } else if (filename.includes('opd') || filename.includes('consultation')) {
        data.opd = Math.floor(Math.random() * 3000) + 500;
      } else if (filename.includes('other') || filename.includes('misc')) {
        data.others = Math.floor(Math.random() * 2000) + 500;
      }
    });
    
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

  const resetForm = () => {
    setFormData({ fromEmail: "", subject: "", body: "" });
    setAttachments([]);
    setProcessedClaim(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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

              {/* Attachments */}
              <div className="space-y-2">
                <Label htmlFor="attachments">Attachments (Invoices)</Label>
                <Input
                  id="attachments"
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground">
                  Supported formats: JPG, PNG, PDF (Multiple files allowed)
                </p>
              </div>

              {/* File Preview */}
              {attachments.length > 0 && (
                <div className="space-y-2">
                  <Label>Selected Files:</Label>
                  <div className="flex flex-wrap gap-2">
                    {attachments.map((file, index) => {
                      const Icon = getFileIcon(file.type);
                      return (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{file.name}</span>
                          <span className="text-xs text-muted-foreground">
                            ({(file.size / 1024).toFixed(1)} KB)
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

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
                      {formatCurrency(calculateTotal(processedClaim.structuredData.categories) || 0)}
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