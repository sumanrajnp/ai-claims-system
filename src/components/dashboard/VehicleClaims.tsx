import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  FunnelChart, 
  Funnel, 
  Cell, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  PieChart,
  Pie
} from "recharts";
import { Car, Wrench, FileText, CheckCircle } from "lucide-react";

interface VehicleClaimsProps {
  data: {
    funnel: {
      quotations: number;
      approved: number;
      invoices: number;
      settled: number;
    };
    varianceTrend: Array<{
      month: string;
      variance: number;
    }>;
    workshops: {
      approved: number;
      nonApproved: number;
    };
    topClaims: Array<{
      policy: string;
      vehicle: string;
      workshop: string;
      quote: number;
      invoice: number;
      variance: number;
    }>;
  };
}

export const VehicleClaims = ({ data }: VehicleClaimsProps) => {
  const funnelData = [
    { name: "Quotations", value: data.funnel.quotations, color: "#3B82F6" },
    { name: "Approved", value: data.funnel.approved, color: "#10B981" },
    { name: "Invoices", value: data.funnel.invoices, color: "#F59E0B" },
    { name: "Settled", value: data.funnel.settled, color: "#8B5CF6" }
  ];

  const workshopData = [
    { name: "Approved", value: data.workshops.approved, color: "#10B981" },
    { name: "Non-Approved", value: data.workshops.nonApproved, color: "#EF4444" }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ne-NP', {
      style: 'currency',
      currency: 'NPR',
      minimumFractionDigits: 0
    }).format(amount).replace('NPR', 'Rs');
  };

  const getVarianceColor = (variance: number) => {
    if (variance <= 1000) return "text-green-600";
    if (variance <= 3000) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="h-5 w-5 text-green-600" />
          Vehicle Claims
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Funnel Chart */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Claims Funnel</h4>
          <ResponsiveContainer width="100%" height={200}>
            <FunnelChart>
              <Tooltip formatter={(value) => [value, 'Claims']} />
              <Funnel
                dataKey="value"
                data={funnelData}
                isAnimationActive
              >
                {funnelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {funnelData.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-lg font-bold" style={{ color: item.color }}>
                  {item.value}
                </div>
                <div className="text-xs text-muted-foreground">{item.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Variance Trend */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Quotation vs Invoice Variance Trend</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data.varianceTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`Rs ${value}K`, 'Variance']} />
              <Line 
                type="monotone" 
                dataKey="variance" 
                stroke="#8B5CF6" 
                strokeWidth={2}
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Workshop Credibility */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Workshop Credibility</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie
                  data={workshopData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {workshopData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'Workshops']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {workshopData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className="text-sm font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Claims Table */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Invoice Details</h4>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Policy</TableHead>
                  <TableHead className="text-xs">Vehicle</TableHead>
                  <TableHead className="text-xs">Workshop</TableHead>
                  <TableHead className="text-xs">Quote</TableHead>
                  <TableHead className="text-xs">Invoice</TableHead>
                  <TableHead className="text-xs">Variance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.topClaims.map((claim, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-xs font-medium">{claim.policy}</TableCell>
                    <TableCell className="text-xs">{claim.vehicle}</TableCell>
                    <TableCell className="text-xs">{claim.workshop}</TableCell>
                    <TableCell className="text-xs">{formatCurrency(claim.quote)}</TableCell>
                    <TableCell className="text-xs">{formatCurrency(claim.invoice)}</TableCell>
                    <TableCell className={`text-xs font-bold ${getVarianceColor(claim.variance)}`}>
                      {formatCurrency(claim.variance)}
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