import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from "recharts";
import { Brain, TrendingUp, AlertTriangle } from "lucide-react";

interface AIPerformanceProps {
  data: {
    accuracyTrend: Array<{
      month: string;
      accuracy: number;
    }>;
    overrides: {
      medicines: number;
      labs: number;
      opd: number;
      vehicleParts: number;
    };
  };
}

export const AIPerformance = ({ data }: AIPerformanceProps) => {
  const overrideData = [
    { name: "Medicines", value: data.overrides.medicines, color: "#3B82F6" },
    { name: "Laboratory", value: data.overrides.labs, color: "#10B981" },
    { name: "OPD", value: data.overrides.opd, color: "#F59E0B" },
    { name: "Vehicle Parts", value: data.overrides.vehicleParts, color: "#8B5CF6" }
  ];

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 95) return "text-green-600";
    if (accuracy >= 90) return "text-yellow-600";
    return "text-red-600";
  };

  const getAccuracyStatus = (accuracy: number) => {
    if (accuracy >= 95) return "Excellent";
    if (accuracy >= 90) return "Good";
    if (accuracy >= 85) return "Fair";
    return "Needs Improvement";
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          AI Performance Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* AI Accuracy Trend */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">OCR Accuracy Trend (Last 6 Months)</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data.accuracyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[80, 100]} />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Accuracy']}
                labelStyle={{ color: '#374151' }}
              />
              <Line 
                type="monotone" 
                dataKey="accuracy" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 8, stroke: '#8B5CF6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
          
          {/* Current Accuracy Status */}
          <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Accuracy</p>
                <p className={`text-2xl font-bold ${getAccuracyColor(data.accuracyTrend[data.accuracyTrend.length - 1].accuracy)}`}>
                  {data.accuracyTrend[data.accuracyTrend.length - 1].accuracy}%
                </p>
                <p className="text-sm text-muted-foreground">
                  Status: {getAccuracyStatus(data.accuracyTrend[data.accuracyTrend.length - 1].accuracy)}
                </p>
              </div>
              <div className="text-right">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <p className="text-xs text-muted-foreground mt-1">AI Learning</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Overrides */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">
            AI Extractions Overridden by Compliance Officers
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={overrideData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [value, 'Overrides']} />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
          
          {/* Override Summary */}
          <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-800">
                Total Overrides: {Object.values(data.overrides).reduce((a, b) => a + b, 0)}
              </span>
            </div>
            <p className="text-xs text-orange-700 mt-1">
              These cases required manual intervention by compliance officers
            </p>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Improvement Trend</span>
            </div>
            <p className="text-xs text-green-700 mt-1">
              AI accuracy has improved by {data.accuracyTrend[data.accuracyTrend.length - 1].accuracy - data.accuracyTrend[0].accuracy}% 
              over the last 6 months
            </p>
          </div>
          
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Learning Rate</span>
            </div>
            <p className="text-xs text-blue-700 mt-1">
              AI system continuously learns from manual overrides to improve accuracy
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 