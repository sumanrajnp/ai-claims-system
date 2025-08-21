import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { claimsData, MedicalClaimDetails, VehicleClaimDetails, ClaimParticular } from "@/data/claimsData";
import { ClaimStatusBadge } from "./ClaimStatusBadge";
import { ConfidenceIndicator } from "./ConfidenceIndicator";
import { 
  ArrowLeft, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  Edit3,
  Mail,
  MessageCircle,
  Smartphone,
  Calendar,
  User,
  Hash,
  DollarSign,
  Pill,
  Stethoscope,
  TestTube,
  Package,
  Wrench,
  Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const channelIcons = {
  OnlineApp: Smartphone,
  Chat: MessageCircle,
  Email: Mail
};

export const ClaimDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [comment, setComment] = useState("");
  
  const claim = claimsData.find(c => c.id === id);
  
  if (!claim) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Claim Not Found</h2>
            <p className="text-muted-foreground mb-4">The claim with ID "{id}" could not be found.</p>
            <Button onClick={() => navigate("/")}>Back to Claims List</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ne-NP', {
      style: 'currency',
      currency: 'NPR',
      minimumFractionDigits: 0
    }).format(amount).replace('NPR', 'Rs');
  };

  const handleStatusUpdate = (newStatus: string, actionType: string) => {
    toast({
      title: "Status Updated",
      description: `Claim ${claim.id} has been ${actionType}.`,
    });
    // In a real app, this would update the backend
  };

  const ChannelIcon = channelIcons[claim.channel];
  const isMedical = claim.type === 'Medical';
  const details = claim.details as MedicalClaimDetails | VehicleClaimDetails;

  const renderClaimBreakdownTable = (details: MedicalClaimDetails | VehicleClaimDetails) => {
    const isMedical = 'categories' in details && 'medicines' in details.categories;
    let allParticulars: Array<ClaimParticular & { category: string }> = [];
    
    if (isMedical) {
      const medDetails = details as MedicalClaimDetails;
      Object.entries(medDetails.categories).forEach(([categoryName, categoryData]) => {
        if (categoryData.particulars) {
          categoryData.particulars.forEach(particular => {
            allParticulars.push({
              ...particular,
              category: categoryName
            });
          });
        }
      });
    } else {
      const vehDetails = details as VehicleClaimDetails;
      Object.entries(vehDetails.categories).forEach(([categoryName, categoryData]) => {
        if (categoryData.particulars) {
          categoryData.particulars.forEach(particular => {
            allParticulars.push({
              ...particular,
              category: categoryName
            });
          });
        }
      });
    }

    const getCategoryIcon = (category: string) => {
      switch (category) {
        case 'medicines': return <Pill className="w-4 h-4 text-blue-600" />;
        case 'lab': return <TestTube className="w-4 h-4 text-green-600" />;
        case 'opd': return <Stethoscope className="w-4 h-4 text-purple-600" />;
        case 'parts': return <Package className="w-4 h-4 text-orange-600" />;
        case 'labor': return <Wrench className="w-4 h-4 text-red-600" />;
        default: return <Plus className="w-4 h-4 text-gray-600" />;
      }
    };

    const getCategoryLabel = (category: string) => {
      switch (category) {
        case 'medicines': return 'Medicines';
        case 'lab': return 'Laboratory';
        case 'opd': return 'OPD';
        case 'parts': return 'Parts';
        case 'labor': return 'Labor';
        case 'others': return 'Others';
        default: return category;
      }
    };

    const getScoreBadgeColor = (score: number) => {
      if (score >= 95) return 'bg-green-100 text-green-800 border-green-300';
      if (score >= 90) return 'bg-blue-100 text-blue-800 border-blue-300';
      if (score >= 85) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      return 'bg-red-100 text-red-800 border-red-300';
    };

    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-12">SN</TableHead>
              <TableHead className="min-w-[300px]">Particulars</TableHead>
              <TableHead className="w-32">Claim Amount</TableHead>
              <TableHead className="w-24">AI Score</TableHead>
              <TableHead className="min-w-[200px]">AI Remarks</TableHead>
              <TableHead className="w-40">Document</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allParticulars.map((particular, index) => (
              <TableRow key={particular.id} className="hover:bg-muted/30">
                <TableCell className="font-medium text-center">
                  {index + 1}
                </TableCell>
                <TableCell>
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      {getCategoryIcon(particular.category)}
                    </div>
                    <div>
                      <div className="font-medium text-sm leading-tight">
                        {particular.description}
                      </div>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {getCategoryLabel(particular.category)}
                      </Badge>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-semibold text-primary">
                  {formatCurrency(particular.amount)}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={`font-medium ${getScoreBadgeColor(particular.aiScore)}`}
                  >
                    {particular.aiScore}%
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {particular.aiRemarks}
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="text-xs">
                    <FileText className="w-3 h-3 mr-1" />
                    {particular.document}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  const renderSummaryCards = (details: MedicalClaimDetails | VehicleClaimDetails) => {
    const isMedical = 'categories' in details && 'medicines' in details.categories;
    
    if (isMedical) {
      const medDetails = details as MedicalClaimDetails;
      const categories = [
        { key: 'medicines', label: 'Medicines', icon: Pill, data: medDetails.categories.medicines },
        { key: 'lab', label: 'Laboratory', icon: TestTube, data: medDetails.categories.lab },
        { key: 'opd', label: 'OPD', icon: Stethoscope, data: medDetails.categories.opd },
        { key: 'others', label: 'Others', icon: Plus, data: medDetails.categories.others }
      ];

      return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {categories.map(({ key, label, icon: Icon, data }) => (
            <Card key={key} className="shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="font-medium text-sm">{label}</span>
                  </div>
                  <ConfidenceIndicator confidence={data.confidence} size="sm" showIcon={false} />
                </div>
                <div className="text-lg font-bold text-primary">
                  {formatCurrency(data.value)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {data.particulars?.length || 0} items
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    } else {
      const vehDetails = details as VehicleClaimDetails;
      const variance = vehDetails.invoiceSubmitted - vehDetails.quotationApproved;
      const variancePercentage = ((variance / vehDetails.quotationApproved) * 100).toFixed(1);

      return (
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="shadow-card">
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground mb-1">Quotation Approved</div>
                <div className="text-xl font-bold text-primary">
                  {formatCurrency(vehDetails.quotationApproved)}
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground mb-1">Invoice Submitted</div>
                <div className="text-xl font-bold text-primary">
                  {formatCurrency(vehDetails.invoiceSubmitted)}
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground mb-1">Variance</div>
                <div className={`text-xl font-bold ${variance > 0 ? 'text-status-exception' : 'text-status-verified'}`}>
                  {variance > 0 ? '+' : ''}{formatCurrency(variance)}
                  <span className="text-sm ml-1">({variancePercentage}%)</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => navigate("/")} size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Claims
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">Claim Details</h1>
            <p className="text-muted-foreground">Review and verify claim information</p>
          </div>
        </div>

        {/* Claim Header Info */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">{claim.id}</CardTitle>
                <div className="flex items-center space-x-4 mt-2 text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{claim.claimant}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Hash className="w-4 h-4" />
                    <span>{claim.policyNumber}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ChannelIcon className="w-4 h-4" />
                    <span>{claim.channel}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(claim.submissionDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <ClaimStatusBadge status={claim.status} size="lg" />
                <div className="flex items-center space-x-1 mt-2 text-primary">
                  <DollarSign className="w-5 h-5" />
                  <span className="text-2xl font-bold">{formatCurrency(claim.amount)}</span>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Claim Summary */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Summary Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {renderSummaryCards(details)}
          </CardContent>
        </Card>

        {/* Detailed Claim Breakdown Table */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Detailed Claim Breakdown</CardTitle>
            <p className="text-sm text-muted-foreground">
              Itemized breakdown of all claim particulars with AI analysis
            </p>
          </CardHeader>
          <CardContent>
            {renderClaimBreakdownTable(details)}
          </CardContent>
        </Card>

        {/* Attachments */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Attachments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {details.attachments.map((attachment, index) => (
                <Card key={index} className="border-2 border-dashed border-border hover:border-primary/20 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-8 h-8 text-primary" />
                      <div className="flex-1">
                        <div className="font-medium">{attachment.filename}</div>
                        <div className="text-sm text-muted-foreground capitalize">
                          {attachment.type} file
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Verification Actions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Verification Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Add Comment (Optional)</label>
              <Textarea
                placeholder="Add any notes or comments about this claim..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="resize-none"
                rows={3}
              />
            </div>
            
            <Separator />
            
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="default"
                onClick={() => handleStatusUpdate("Verified", "verified")}
                className="bg-status-verified hover:bg-status-verified/90 text-white"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark as Verified
              </Button>
              
              <Button 
                variant="destructive"
                onClick={() => handleStatusUpdate("Exception", "flagged as exception")}
                className="bg-status-exception hover:bg-status-exception/90"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Flag as Exception
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => handleStatusUpdate("Review", "sent for adjuster review")}
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Send for Adjuster Review
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};