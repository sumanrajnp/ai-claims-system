import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  X, 
  FileText, 
  Download, 
  Eye, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  User,
  CreditCard,
  Calendar,
  MessageSquare,
  Mail,
  Globe,
  Zap,
  Brain,
  TrendingUp
} from "lucide-react";
import { PipelineClaim, MedicalStructuredData, VehicleStructuredData } from "@/data/pipelineData";

interface ClaimDetailDrawerProps {
  claim: PipelineClaim | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ClaimDetailDrawer = ({ claim, isOpen, onClose }: ClaimDetailDrawerProps) => {
  const [selectedAttachment, setSelectedAttachment] = useState<string | null>(null);

  if (!claim) return null;

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "Email":
        return Mail;
      case "Chat":
        return MessageSquare;
      case "Portal":
        return Globe;
      case "API":
        return Zap;
      default:
        return FileText;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ne-NP', {
      style: 'currency',
      currency: 'NPR',
      minimumFractionDigits: 0
    }).format(amount).replace('NPR', 'Rs');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (stage: string) => {
    switch (stage) {
      case "Received":
        return "bg-blue-100 text-blue-800";
      case "AI Processed":
        return "bg-purple-100 text-purple-800";
      case "Compliance Pending":
        return "bg-orange-100 text-orange-800";
      case "Verified":
        return "bg-green-100 text-green-800";
      case "Settled":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const SourceIcon = getSourceIcon(claim.source);

  const isMedicalClaim = claim.type === "Medical";
  const medicalData = isMedicalClaim ? claim.structuredData as MedicalStructuredData : null;
  const vehicleData = !isMedicalClaim ? claim.structuredData as VehicleStructuredData : null;

  return (
    <div className={`fixed inset-y-0 right-0 w-96 bg-background border-l shadow-xl transform transition-transform duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    } z-50`}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Claim Details</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Claim ID</span>
              <span className="text-sm font-bold text-foreground">{claim.id}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Status</span>
              <Badge className={getStatusColor(claim.stage)}>
                {claim.stage}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Amount</span>
              <span className="text-lg font-bold text-foreground">
                {formatCurrency(claim.amount)}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Claim Header Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Claim Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Claimant</p>
                  <p className="text-sm font-medium">{claim.claimant}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Policy</p>
                  <p className="text-sm font-medium">{claim.policyNumber}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Created</p>
                  <p className="text-sm font-medium">{formatDate(claim.createdAt)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <SourceIcon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Source</p>
                  <p className="text-sm font-medium">{claim.source}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Structured Data Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Structured Data</h3>
            
            {isMedicalClaim && medicalData && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  {medicalData.medicines && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-blue-800">Medicines</span>
                        <Brain className="h-4 w-4 text-blue-600" />
                      </div>
                      <p className="text-lg font-bold text-blue-900">
                        {formatCurrency(medicalData.medicines.value)}
                      </p>
                      <p className="text-xs text-blue-700">
                        AI Confidence: {medicalData.medicines.confidence}%
                      </p>
                    </div>
                  )}
                  
                  {medicalData.labs && (
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-green-800">Laboratory</span>
                        <Brain className="h-4 w-4 text-green-600" />
                      </div>
                      <p className="text-lg font-bold text-green-900">
                        {formatCurrency(medicalData.labs.value)}
                      </p>
                      <p className="text-xs text-green-700">
                        AI Confidence: {medicalData.labs.confidence}%
                      </p>
                    </div>
                  )}
                  
                  {medicalData.opd && (
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-yellow-800">OPD</span>
                        <Brain className="h-4 w-4 text-yellow-600" />
                      </div>
                      <p className="text-lg font-bold text-yellow-900">
                        {formatCurrency(medicalData.opd.value)}
                      </p>
                      <p className="text-xs text-yellow-700">
                        AI Confidence: {medicalData.opd.confidence}%
                      </p>
                    </div>
                  )}
                  
                  {medicalData.others && (
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-purple-800">Others</span>
                        <Brain className="h-4 w-4 text-purple-600" />
                      </div>
                      <p className="text-lg font-bold text-purple-900">
                        {formatCurrency(medicalData.others.value)}
                      </p>
                      <p className="text-xs text-purple-700">
                        AI Confidence: {medicalData.others.confidence}%
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {!isMedicalClaim && vehicleData && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-blue-800">Quotation Approved</span>
                    <p className="text-lg font-bold text-blue-900">
                      {formatCurrency(vehicleData.quotationApproved)}
                    </p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-green-800">Invoice Submitted</span>
                    <p className="text-lg font-bold text-green-900">
                      {formatCurrency(vehicleData.invoiceSubmitted)}
                    </p>
                  </div>
                  
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <span className="text-sm font-medium text-orange-800">Variance</span>
                    <p className="text-lg font-bold text-orange-900">
                      {formatCurrency(vehicleData.variance)}
                    </p>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium text-purple-800">Parts</span>
                    <p className="text-lg font-bold text-purple-900">
                      {formatCurrency(vehicleData.parts)}
                    </p>
                  </div>
                  
                  <div className="p-3 bg-indigo-50 rounded-lg">
                    <span className="text-sm font-medium text-indigo-800">Labor</span>
                    <p className="text-lg font-bold text-indigo-900">
                      {formatCurrency(vehicleData.labor)}
                    </p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-800">Others</span>
                    <p className="text-lg font-bold text-gray-900">
                      {formatCurrency(vehicleData.others)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Attachments Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Attachments</h3>
            
            <div className="space-y-3">
              {claim.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{attachment.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{attachment.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-3"
                      onClick={() => setSelectedAttachment(attachment.url)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-3"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Actions Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Actions</h3>
            
            <div className="grid grid-cols-1 gap-3">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Verify Claim
              </Button>
              
              <Button variant="outline" className="w-full border-red-200 text-red-700 hover:bg-red-50">
                <XCircle className="h-4 w-4 mr-2" />
                Mark Exception
              </Button>
              
              <Button variant="outline" className="w-full">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Escalate to Adjuster
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 