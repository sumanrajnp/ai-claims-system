import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClaimCard } from "./ClaimCard";
import { ClaimDetailDrawer } from "./ClaimDetailDrawer";
import { PipelineClaim, pipelineStages } from "@/data/pipelineData";
import { Search, Filter, GitBranch } from "lucide-react";

export const ClaimPipelinePage = () => {
  const [selectedClaim, setSelectedClaim] = useState<PipelineClaim | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSource, setSelectedSource] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  const handleViewDetails = (claim: PipelineClaim) => {
    setSelectedClaim(claim);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedClaim(null);
  };

  const filteredStages = pipelineStages.map(stage => ({
    ...stage,
    claims: stage.claims.filter(claim => {
      const matchesSearch = 
        claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.claimant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.policyNumber.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSource = selectedSource === "all" || claim.source === selectedSource;
      const matchesType = selectedType === "all" || claim.type === selectedType;
      
      return matchesSearch && matchesSource && matchesType;
    })
  }));

  const totalClaims = pipelineStages.reduce((total, stage) => total + stage.claims.length, 0);
  const filteredTotalClaims = filteredStages.reduce((total, stage) => total + stage.claims.length, 0);

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-3">
            <GitBranch className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Claim Pipelines</h1>
              <p className="text-muted-foreground">
                Track claims through processing stages with AI-powered insights
              </p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Total Claims:</span>
              <Badge variant="secondary">{totalClaims}</Badge>
            </div>
            {searchTerm || selectedSource !== "all" || selectedType !== "all" ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Filtered:</span>
                <Badge variant="outline">{filteredTotalClaims}</Badge>
              </div>
            ) : null}
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search claims by ID, claimant, or policy..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedSource} onValueChange={setSelectedSource}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Source Channel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="Email">Email</SelectItem>
                  <SelectItem value="Chat">Chat</SelectItem>
                  <SelectItem value="Portal">Portal</SelectItem>
                  <SelectItem value="API">API</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Claim Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Medical">Medical</SelectItem>
                  <SelectItem value="Vehicle">Vehicle</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSource("all");
                  setSelectedType("all");
                }}
                className="w-full sm:w-auto"
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {filteredStages.map((stage) => (
            <div key={stage.id} className="space-y-4">
              {/* Stage Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${stage.bgColor.replace('bg-', 'bg-')}`}></div>
                  <h3 className={`font-semibold ${stage.color}`}>
                    {stage.title}
                  </h3>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {stage.claims.length}
                </Badge>
              </div>
              
              {/* Stage Column */}
              <div className={`min-h-[600px] p-4 rounded-lg border-2 border-dashed ${stage.bgColor.replace('bg-', 'border-')} ${stage.bgColor}`}>
                {stage.claims.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-center">
                    <div className="text-muted-foreground">
                      <p className="text-sm">No claims</p>
                      <p className="text-xs">in this stage</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {stage.claims.map((claim) => (
                      <ClaimCard
                        key={claim.id}
                        claim={claim}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Claim Detail Drawer */}
      <ClaimDetailDrawer
        claim={selectedClaim}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  );
}; 