import { GlobalKPIs } from "./dashboard/GlobalKPIs";
import { MedicalClaims } from "./dashboard/MedicalClaims";
import { VehicleClaims } from "./dashboard/VehicleClaims";
import { AIPerformance } from "./dashboard/AIPerformance";
import { dashboardData } from "@/data/dashboardData";

export const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI-Powered Claims Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive overview of insurance claims processing and AI performance metrics
            </p>
          </div>
        </div>

        {/* Global KPIs */}
        <GlobalKPIs data={dashboardData.globalStats} />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Medical Claims */}
          <MedicalClaims data={dashboardData.medicalClaims} />
          
          {/* Vehicle Claims */}
          <VehicleClaims data={dashboardData.vehicleClaims} />
        </div>

        {/* AI Performance - Full Width */}
        <AIPerformance data={dashboardData.aiPerformance} />
      </div>
    </div>
  );
}; 