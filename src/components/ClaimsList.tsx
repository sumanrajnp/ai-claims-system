import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { claimsData, Claim } from "@/data/claimsData";
import { ClaimStatusBadge } from "./ClaimStatusBadge";
import { Search, Eye, Mail, MessageCircle, Smartphone } from "lucide-react";

const channelIcons = {
  OnlineApp: Smartphone,
  Chat: MessageCircle,
  Email: Mail
};

export const ClaimsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Claim>("submissionDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const navigate = useNavigate();

  const filteredAndSortedClaims = claimsData
    .filter(claim => 
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.claimant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.policyNumber.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === "asc" 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });

  const handleSort = (field: keyof Claim) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ne-NP', {
      style: 'currency',
      currency: 'NPR',
      minimumFractionDigits: 0
    }).format(amount).replace('NPR', 'Rs');
  };

  const handleViewDetails = (claimId: string) => {
    navigate(`/claim/${claimId}`);
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Claims Management</h1>
            <p className="text-muted-foreground">Review and process insurance claims</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search claims..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Claims Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort("id")}
                    >
                      Claim ID
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort("claimant")}
                    >
                      Claimant
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort("policyNumber")}
                    >
                      Policy Number
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort("type")}
                    >
                      Type
                    </TableHead>
                    <TableHead>Channel</TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort("amount")}
                    >
                      Amount
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort("status")}
                    >
                      Status
                    </TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedClaims.map((claim) => {
                    const ChannelIcon = channelIcons[claim.channel];
                    return (
                      <TableRow key={claim.id} className="hover:bg-muted/30">
                        <TableCell className="font-medium">{claim.id}</TableCell>
                        <TableCell>{claim.claimant}</TableCell>
                        <TableCell>{claim.policyNumber}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{claim.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <ChannelIcon className="w-4 h-4 text-muted-foreground" />
                            <span>{claim.channel}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(claim.amount)}
                        </TableCell>
                        <TableCell>
                          <ClaimStatusBadge status={claim.status} />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(claim.id)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};