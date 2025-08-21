import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome to Claim Inspector AI</p>
          </div>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Dashboard Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Dashboard content will be implemented here in the future.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 