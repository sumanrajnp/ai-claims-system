import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  Shield, 
  TrendingUp 
} from "lucide-react";

interface GlobalKPIsProps {
  data: {
    total: number;
    autoProcessed: number;
    pendingManual: number;
    complianceRate: number;
    avgProcessingTime: number;
  };
}

export const GlobalKPIs = ({ data }: GlobalKPIsProps) => {
  const kpiItems = [
    {
      title: "Total Claims",
      value: data.total.toLocaleString(),
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      title: "Auto-Processed",
      value: data.autoProcessed.toLocaleString(),
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      title: "Pending Manual",
      value: data.pendingManual.toLocaleString(),
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      title: "Compliance Rate",
      value: `${data.complianceRate}%`,
      icon: Shield,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      title: "Avg Processing Time",
      value: `${data.avgProcessingTime} days`,
      icon: TrendingUp,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {kpiItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <Card key={index} className="border-2 hover:shadow-lg transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {item.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {item.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${item.bgColor}`}>
                  <Icon className={`h-6 w-6 ${item.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}; 