import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Activity, Pill, Microscope, Stethoscope } from "lucide-react";

interface MedicalClaimsProps {
  data: {
    categories: {
      medicines: number;
      laboratory: number;
      opd: number;
      others: number;
    };
    hardcopyVerification: {
      verified: number;
      exceptions: number;
    };
    topClaims: Array<{
      policy: string;
      claimant: string;
      amount: number;
      status: string;
    }>;
  };
}

export const MedicalClaims = ({ data }: MedicalClaimsProps) => {
  const categoryData = [
    { name: "Medicines", value: data.categories.medicines, icon: Pill, color: "#3B82F6" },
    { name: "Laboratory", value: data.categories.laboratory, icon: Microscope, color: "#10B981" },
    { name: "OPD", value: data.categories.opd, icon: Stethoscope, color: "#F59E0B" },
    { name: "Others", value: data.categories.others, icon: Activity, color: "#8B5CF6" }
  ];

  const verificationData = [
    { name: "Verified", value: data.hardcopyVerification.verified, color: "#10B981" },
    { name: "Exceptions", value: data.hardcopyVerification.exceptions, color: "#EF4444" }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ne-NP', {
      style: 'currency',
      currency: 'NPR',
      minimumFractionDigits: 0
    }).format(amount).replace('NPR', 'Rs');
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-600" />
          Medical & Health Indemnity Claims
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories Distribution */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Claims by Category</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'Claims']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {categoryData.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" style={{ color: item.color }} />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <span className="text-sm font-bold">{item.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Hardcopy Verification */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Hardcopy Verification Status</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={verificationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [value, 'Claims']} />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Claims Table */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Top Claims</h4>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Policy</TableHead>
                  <TableHead className="text-xs">Claimant</TableHead>
                  <TableHead className="text-xs">Amount</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.topClaims.map((claim, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-xs font-medium">{claim.policy}</TableCell>
                    <TableCell className="text-xs">{claim.claimant}</TableCell>
                    <TableCell className="text-xs">{formatCurrency(claim.amount)}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={claim.status === "Verified" ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {claim.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 