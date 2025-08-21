import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  User, 
  CreditCard, 
  MessageSquare, 
  Mail, 
  Globe, 
  Zap,
  Eye
} from "lucide-react";
import { PipelineClaim } from "@/data/pipelineData";

interface ClaimCardProps {
  claim: PipelineClaim;
  onViewDetails: (claim: PipelineClaim) => void;
}

export const ClaimCard = ({ claim, onViewDetails }: ClaimCardProps) => {
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

  const getTypeColor = (type: string) => {
    return type === "Medical" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800";
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case "Email":
        return "bg-orange-100 text-orange-800";
      case "Chat":
        return "bg-purple-100 text-purple-800";
      case "Portal":
        return "bg-indigo-100 text-indigo-800";
      case "API":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
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
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const SourceIcon = getSourceIcon(claim.source);

  return (
    <Card className="mb-3 cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-sm text-foreground mb-1">
              {claim.id}
            </h3>
            <div className="flex items-center gap-2 mb-2">
              <User className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground truncate">
                {claim.claimant}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-blue-50"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(claim);
            }}
          >
            <Eye className="h-3 w-3" />
          </Button>
        </div>

        {/* Policy and Type */}
        <div className="flex items-center gap-2 mb-3">
          <CreditCard className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {claim.policyNumber}
          </span>
          <Badge className={`text-xs px-2 py-1 ${getTypeColor(claim.type)}`}>
            {claim.type}
          </Badge>
        </div>

        {/* Source Channel */}
        <div className="flex items-center gap-2 mb-3">
          <SourceIcon className="h-3 w-3 text-muted-foreground" />
          <Badge className={`text-xs px-2 py-1 ${getSourceColor(claim.source)}`}>
            {claim.source}
          </Badge>
        </div>

        {/* Amount */}
        <div className="mb-3">
          <span className="text-lg font-bold text-foreground">
            {formatCurrency(claim.amount)}
          </span>
        </div>

        {/* Attachments */}
        <div className="flex items-center gap-2 mb-3">
          <FileText className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {claim.attachments.length} attachment{claim.attachments.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Footer */}
        <div className="text-xs text-muted-foreground">
          Updated: {formatDate(claim.updatedAt)}
        </div>
      </CardContent>
    </Card>
  );
}; 