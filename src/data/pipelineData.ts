export interface PipelineClaim {
  id: string;
  claimant: string;
  policyNumber: string;
  type: "Medical" | "Vehicle";
  source: "Email" | "Chat" | "Portal" | "API";
  stage: "Received" | "AI Processed" | "Compliance Pending" | "Verified" | "Settled";
  amount: number;
  attachments: Array<{
    name: string;
    url: string;
    type: "pdf" | "jpg" | "png";
  }>;
  structuredData: MedicalStructuredData | VehicleStructuredData;
  createdAt: string;
  updatedAt: string;
}

export interface MedicalStructuredData {
  medicines?: { value: number; confidence: number };
  labs?: { value: number; confidence: number };
  opd?: { value: number; confidence: number };
  others?: { value: number; confidence: number };
}

export interface VehicleStructuredData {
  quotationApproved: number;
  invoiceSubmitted: number;
  variance: number;
  parts: number;
  labor: number;
  others: number;
}

export interface PipelineStage {
  id: string;
  title: string;
  claims: PipelineClaim[];
  color: string;
  bgColor: string;
}

export const pipelineData: PipelineClaim[] = [
  {
    id: "CLM-101",
    claimant: "Ravi Kumar",
    policyNumber: "HMP-2024-123",
    type: "Medical",
    source: "Email",
    stage: "Compliance Pending",
    amount: 11200,
    attachments: [
      { name: "hospital_bill.pdf", url: "/dummy/hospital_bill.pdf", type: "pdf" },
      { name: "lab_report.png", url: "/dummy/lab_report.png", type: "png" }
    ],
    structuredData: {
      medicines: { value: 2500, confidence: 92 },
      labs: { value: 5000, confidence: 89 },
      opd: { value: 3200, confidence: 94 }
    },
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-16T14:20:00Z"
  },
  {
    id: "CLM-102",
    claimant: "Meera Singh",
    policyNumber: "VCL-2024-908",
    type: "Vehicle",
    source: "Portal",
    stage: "Verified",
    amount: 46800,
    attachments: [
      { name: "workshop_quote.pdf", url: "/dummy/workshop_quote.pdf", type: "pdf" },
      { name: "final_invoice.jpg", url: "/dummy/final_invoice.jpg", type: "jpg" }
    ],
    structuredData: {
      quotationApproved: 45000,
      invoiceSubmitted: 46800,
      variance: 1800,
      parts: 38000,
      labor: 7000,
      others: 800
    },
    createdAt: "2024-01-14T09:15:00Z",
    updatedAt: "2024-01-16T11:45:00Z"
  },
  {
    id: "CLM-103",
    claimant: "Bikash Thapa",
    policyNumber: "HMP-2024-124",
    type: "Medical",
    source: "Chat",
    stage: "Received",
    amount: 8500,
    attachments: [
      { name: "prescription.pdf", url: "/dummy/prescription.pdf", type: "pdf" },
      { name: "medical_certificate.jpg", url: "/dummy/medical_certificate.jpg", type: "jpg" }
    ],
    structuredData: {
      medicines: { value: 3500, confidence: 88 },
      opd: { value: 5000, confidence: 91 }
    },
    createdAt: "2024-01-16T16:45:00Z",
    updatedAt: "2024-01-16T16:45:00Z"
  },
  {
    id: "CLM-104",
    claimant: "Anita Gurung",
    policyNumber: "VCL-2024-909",
    type: "Vehicle",
    source: "API",
    stage: "AI Processed",
    amount: 32000,
    attachments: [
      { name: "accident_report.pdf", url: "/dummy/accident_report.pdf", type: "pdf" },
      { name: "damage_photos.png", url: "/dummy/damage_photos.png", type: "png" }
    ],
    structuredData: {
      quotationApproved: 30000,
      invoiceSubmitted: 32000,
      variance: 2000,
      parts: 25000,
      labor: 6000,
      others: 1000
    },
    createdAt: "2024-01-15T13:20:00Z",
    updatedAt: "2024-01-16T10:30:00Z"
  },
  {
    id: "CLM-105",
    claimant: "Prakash Sharma",
    policyNumber: "HMP-2024-125",
    type: "Medical",
    source: "Email",
    stage: "Settled",
    amount: 15600,
    attachments: [
      { name: "surgery_bill.pdf", url: "/dummy/surgery_bill.pdf", type: "pdf" },
      { name: "discharge_summary.pdf", url: "/dummy/discharge_summary.pdf", type: "pdf" }
    ],
    structuredData: {
      medicines: { value: 8000, confidence: 95 },
      labs: { value: 4000, confidence: 93 },
      opd: { value: 3600, confidence: 90 }
    },
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-15T17:30:00Z"
  },
  {
    id: "CLM-106",
    claimant: "Sita Devi",
    policyNumber: "VCL-2024-910",
    type: "Vehicle",
    source: "Portal",
    stage: "AI Processed",
    amount: 28000,
    attachments: [
      { name: "repair_estimate.pdf", url: "/dummy/repair_estimate.pdf", type: "pdf" },
      { name: "parts_list.pdf", url: "/dummy/parts_list.pdf", type: "pdf" }
    ],
    structuredData: {
      quotationApproved: 28000,
      invoiceSubmitted: 28000,
      variance: 0,
      parts: 22000,
      labor: 5000,
      others: 1000
    },
    createdAt: "2024-01-16T11:00:00Z",
    updatedAt: "2024-01-16T15:45:00Z"
  }
];

export const pipelineStages: PipelineStage[] = [
  {
    id: "received",
    title: "Received",
    claims: pipelineData.filter(claim => claim.stage === "Received"),
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    id: "ai-processed",
    title: "AI Processed",
    claims: pipelineData.filter(claim => claim.stage === "AI Processed"),
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    id: "compliance-pending",
    title: "Compliance Pending",
    claims: pipelineData.filter(claim => claim.stage === "Compliance Pending"),
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  },
  {
    id: "verified",
    title: "Verified ✅",
    claims: pipelineData.filter(claim => claim.stage === "Verified"),
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    id: "settled",
    title: "Settled 💰",
    claims: pipelineData.filter(claim => claim.stage === "Settled"),
    color: "text-emerald-600",
    bgColor: "bg-emerald-50"
  }
]; 