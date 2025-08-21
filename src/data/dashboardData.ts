export interface DashboardData {
  globalStats: {
    total: number;
    autoProcessed: number;
    pendingManual: number;
    complianceRate: number;
    avgProcessingTime: number;
  };
  medicalClaims: {
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
  vehicleClaims: {
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
  aiPerformance: {
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

export const dashboardData: DashboardData = {
  globalStats: {
    total: 1200,
    autoProcessed: 800,
    pendingManual: 250,
    complianceRate: 92,
    avgProcessingTime: 4.2
  },
  medicalClaims: {
    categories: {
      medicines: 320,
      laboratory: 210,
      opd: 140,
      others: 90
    },
    hardcopyVerification: {
      verified: 700,
      exceptions: 50
    },
    topClaims: [
      { policy: "HMP-2024-011", claimant: "Ram Bahadur Thapa", amount: 12000, status: "Verified" },
      { policy: "HMP-2024-014", claimant: "Sita Devi Shrestha", amount: 8700, status: "Exception" },
      { policy: "HMP-2024-018", claimant: "Bikash Kumar Tamang", amount: 15600, status: "Verified" },
      { policy: "HMP-2024-022", claimant: "Anita Gurung", amount: 9200, status: "Verified" },
      { policy: "HMP-2024-025", claimant: "Prakash Sharma", amount: 13400, status: "Exception" }
    ]
  },
  vehicleClaims: {
    funnel: {
      quotations: 450,
      approved: 380,
      invoices: 320,
      settled: 300
    },
    varianceTrend: [
      { month: "Jan", variance: 3.2 },
      { month: "Feb", variance: 1.8 },
      { month: "Mar", variance: 2.5 },
      { month: "Apr", variance: 2.1 },
      { month: "May", variance: 3.8 },
      { month: "Jun", variance: 2.9 }
    ],
    workshops: {
      approved: 260,
      nonApproved: 60
    },
    topClaims: [
      { policy: "VCL-2024-102", vehicle: "Ba 1 Pa 1234", workshop: "ABC Autoworks", quote: 45000, invoice: 46200, variance: 1200 },
      { policy: "VCL-2024-108", vehicle: "Ba 2 Pa 9988", workshop: "XYZ Motors", quote: 52000, invoice: 60000, variance: 8000 },
      { policy: "VCL-2024-115", vehicle: "Ba 3 Pa 5678", workshop: "Premium Garage", quote: 38000, invoice: 39500, variance: 1500 },
      { policy: "VCL-2024-122", vehicle: "Ba 4 Pa 4321", workshop: "City Auto", quote: 62000, invoice: 65000, variance: 3000 },
      { policy: "VCL-2024-129", vehicle: "Ba 5 Pa 8765", workshop: "Express Motors", quote: 28000, invoice: 28500, variance: 500 }
    ]
  },
  aiPerformance: {
    accuracyTrend: [
      { month: "Jan", accuracy: 88 },
      { month: "Feb", accuracy: 90 },
      { month: "Mar", accuracy: 92 },
      { month: "Apr", accuracy: 91 },
      { month: "May", accuracy: 94 },
      { month: "Jun", accuracy: 96 }
    ],
    overrides: {
      medicines: 12,
      labs: 8,
      opd: 4,
      vehicleParts: 6
    }
  }
}; 