export interface ClaimCategory {
  value: number;
  confidence: number;
  particulars?: ClaimParticular[];
}

export interface ClaimParticular {
  id: string;
  description: string;
  amount: number;
  aiScore: number;
  aiRemarks: string;
  document: string;
}

export interface Attachment {
  filename: string;
  url: string;
  type: 'pdf' | 'image';
}

export interface MedicalClaimDetails {
  categories: {
    medicines: ClaimCategory;
    lab: ClaimCategory;
    opd: ClaimCategory;
    others: ClaimCategory;
  };
  attachments: Attachment[];
}

export interface VehicleClaimDetails {
  quotationApproved: number;
  invoiceSubmitted: number;
  categories: {
    parts: ClaimCategory;
    labor: ClaimCategory;
    others: ClaimCategory;
  };
  attachments: Attachment[];
}

export interface Claim {
  id: string;
  claimant: string;
  policyNumber: string;
  type: 'Medical' | 'Vehicle';
  channel: 'OnlineApp' | 'Chat' | 'Email';
  amount: number;
  status: 'Pending' | 'Verified' | 'Exception' | 'Settled';
  submissionDate: string;
  details: MedicalClaimDetails | VehicleClaimDetails;
}

export const claimsData: Claim[] = [
  {
    id: "CLM-001",
    claimant: "राम बहादुर श्रेष्ठ",
    policyNumber: "HMP-2024-011",
    type: "Medical",
    channel: "Email",
    amount: 107000,
    status: "Pending",
    submissionDate: "2024-01-15",
    details: {
      categories: {
        medicines: { 
          value: 25000, 
          confidence: 92,
          particulars: [
            {
              id: "MED-001",
              description: "Paracetamol 500mg (Deurali-Janta Pharmaceuticals)",
              amount: 850,
              aiScore: 95,
              aiRemarks: "Medicine name and dosage clearly visible",
              document: "pharmacy_bill.pdf"
            },
            {
              id: "MED-002", 
              description: "Amoxicillin 250mg (Nepal Pharmaceuticals)",
              amount: 1200,
              aiScore: 92,
              aiRemarks: "Brand and strength identified correctly",
              document: "pharmacy_bill.pdf"
            },
            {
              id: "MED-003",
              description: "Crocin Advance (GlaxoSmithKline Nepal)",
              amount: 450,
              aiScore: 88,
              aiRemarks: "Brand name clearly extracted",
              document: "pharmacy_bill.pdf"
            }
          ]
        },
        lab: { 
          value: 50000, 
          confidence: 89,
          particulars: [
            {
              id: "LAB-001",
              description: "Complete Blood Count (CBC)",
              amount: 1500,
              aiScore: 94,
              aiRemarks: "Standard test code identified",
              document: "lab_report.pdf"
            },
            {
              id: "LAB-002",
              description: "Liver Function Test (LFT)",
              amount: 2800,
              aiScore: 91,
              aiRemarks: "Test panel correctly identified",
              document: "lab_report.pdf"
            },
            {
              id: "LAB-003",
              description: "Chest X-Ray (AP View)",
              amount: 1200,
              aiScore: 87,
              aiRemarks: "Radiology procedure identified",
              document: "xray_report.pdf"
            }
          ]
        },
        opd: { 
          value: 20000, 
          confidence: 94,
          particulars: [
            {
              id: "OPD-001",
              description: "Dr. सुरेश कुमार पौडेल - NMC: 12547",
              amount: 850,
              aiScore: 96,
              aiRemarks: "Doctor name and NMC number clearly extracted",
              document: "consultation_receipt.pdf"
            },
            {
              id: "OPD-002",
              description: "Dr. प्रिया राणा - NMC: 15832",
              amount: 1200,
              aiScore: 93,
              aiRemarks: "Specialist consultation identified",
              document: "specialist_receipt.pdf"
            }
          ]
        },
        others: { 
          value: 12000, 
          confidence: 85,
          particulars: [
            {
              id: "OTH-001",
              description: "Ambulance Service (Kathmandu to Pokhara)",
              amount: 8000,
              aiScore: 88,
              aiRemarks: "Transportation cost identified",
              document: "ambulance_receipt.pdf"
            },
            {
              id: "OTH-002",
              description: "Medical Certificate Fee",
              amount: 500,
              aiScore: 82,
              aiRemarks: "Administrative fee extracted",
              document: "certificate_receipt.pdf"
            }
          ]
        }
      },
      attachments: [
        { filename: "lab_report.pdf", url: "/dummy/lab_report.pdf", type: "pdf" },
        { filename: "hospital_bill.png", url: "/dummy/hospital_bill.png", type: "image" }
      ]
    } as MedicalClaimDetails
  },
  {
    id: "CLM-002",
    claimant: "सीता देवी गुरुङ",
    policyNumber: "VCL-2024-108",
    type: "Vehicle",
    channel: "OnlineApp",
    amount: 462000,
    status: "Exception",
    submissionDate: "2024-01-12",
    details: {
      quotationApproved: 450000,
      invoiceSubmitted: 462000,
      categories: {
        parts: { 
          value: 380000, 
          confidence: 95,
          particulars: [
            {
              id: "PRT-001",
              description: "Honda City - Front Bumper (Genuine Part)",
              amount: 45000,
              aiScore: 97,
              aiRemarks: "Genuine part number verified",
              document: "parts_invoice.pdf"
            },
            {
              id: "PRT-002",
              description: "Headlight Assembly (Right Side)",
              amount: 28000,
              aiScore: 94,
              aiRemarks: "OEM part identification successful",
              document: "parts_invoice.pdf"
            }
          ]
        },
        labor: { 
          value: 70000, 
          confidence: 91,
          particulars: [
            {
              id: "LBR-001",
              description: "Body Repair and Painting",
              amount: 45000,
              aiScore: 92,
              aiRemarks: "Labor hours calculated correctly",
              document: "labor_receipt.pdf"
            },
            {
              id: "LBR-002",
              description: "Electrical Work",
              amount: 15000,
              aiScore: 89,
              aiRemarks: "Specialist labor identified",
              document: "electrical_receipt.pdf"
            }
          ]
        },
        others: { 
          value: 12000, 
          confidence: 87,
          particulars: [
            {
              id: "OTH-001",
              description: "Towing Charges",
              amount: 5000,
              aiScore: 90,
              aiRemarks: "Emergency service charge",
              document: "towing_receipt.pdf"
            }
          ]
        }
      },
      attachments: [
        { filename: "workshop_quote.pdf", url: "/dummy/workshop_quote.pdf", type: "pdf" },
        { filename: "final_invoice.jpg", url: "/dummy/final_invoice.jpg", type: "image" }
      ]
    } as VehicleClaimDetails
  },
  {
    id: "CLM-003",
    claimant: "अर्जुन तामाङ",
    policyNumber: "HMP-2024-025",
    type: "Medical",
    channel: "Chat",
    amount: 85000,
    status: "Verified",
    submissionDate: "2024-01-18",
    details: {
      categories: {
        medicines: { 
          value: 32000, 
          confidence: 96,
          particulars: [
            {
              id: "MED-001",
              description: "Insulin Injection (Novo Nordisk Nepal)",
              amount: 4500,
              aiScore: 98,
              aiRemarks: "Prescription medication verified",
              document: "prescription.pdf"
            }
          ]
        },
        lab: { 
          value: 28000, 
          confidence: 91,
          particulars: [
            {
              id: "LAB-001",
              description: "HbA1c Test",
              amount: 1800,
              aiScore: 95,
              aiRemarks: "Diabetes monitoring test",
              document: "lab_results.pdf"
            }
          ]
        },
        opd: { 
          value: 15000, 
          confidence: 89,
          particulars: [
            {
              id: "OPD-001",
              description: "Dr. रमेश खड्का - NMC: 18965",
              amount: 850,
              aiScore: 92,
              aiRemarks: "Endocrinologist consultation",
              document: "doctor_fee.pdf"
            }
          ]
        },
        others: { 
          value: 10000, 
          confidence: 88,
          particulars: [
            {
              id: "OTH-001",
              description: "Glucose Monitor Device",
              amount: 7500,
              aiScore: 85,
              aiRemarks: "Medical equipment purchase",
              document: "device_receipt.pdf"
            }
          ]
        }
      },
      attachments: [
        { filename: "prescription.pdf", url: "/dummy/prescription.pdf", type: "pdf" },
        { filename: "pharmacy_bill.jpg", url: "/dummy/pharmacy_bill.jpg", type: "image" }
      ]
    } as MedicalClaimDetails
  },
  {
    id: "CLM-004",
    claimant: "पूजा श्रेष्ठ",
    policyNumber: "VCL-2024-089",
    type: "Vehicle",
    channel: "OnlineApp",
    amount: 324000,
    status: "Settled",
    submissionDate: "2024-01-10",
    details: {
      quotationApproved: 320000,
      invoiceSubmitted: 324000,
      categories: {
        parts: { 
          value: 250000, 
          confidence: 98,
          particulars: [
            {
              id: "PRT-001",
              description: "Maruti Swift - Side Mirror (Left)",
              amount: 12000,
              aiScore: 99,
              aiRemarks: "Part number matches exactly",
              document: "parts_bill.pdf"
            }
          ]
        },
        labor: { 
          value: 60000, 
          confidence: 94,
          particulars: [
            {
              id: "LBR-001",
              description: "Minor Dent Repair",
              amount: 25000,
              aiScore: 96,
              aiRemarks: "Standard repair procedure",
              document: "workshop_bill.pdf"
            }
          ]
        },
        others: { 
          value: 14000, 
          confidence: 92,
          particulars: [
            {
              id: "OTH-001",
              description: "Vehicle Inspection Fee",
              amount: 2000,
              aiScore: 94,
              aiRemarks: "Mandatory inspection charge",
              document: "inspection_receipt.pdf"
            }
          ]
        }
      },
      attachments: [
        { filename: "garage_estimate.pdf", url: "/dummy/garage_estimate.pdf", type: "pdf" },
        { filename: "repair_invoice.png", url: "/dummy/repair_invoice.png", type: "image" }
      ]
    } as VehicleClaimDetails
  },
  {
    id: "CLM-005",
    claimant: "कमल बस्नेत",
    policyNumber: "HMP-2024-033",
    type: "Medical",
    channel: "Email",
    amount: 153000,
    status: "Pending",
    submissionDate: "2024-01-20",
    details: {
      categories: {
        medicines: { 
          value: 42000, 
          confidence: 94,
          particulars: [
            {
              id: "MED-001",
              description: "Atorvastatin 20mg (Cipla Nepal)",
              amount: 1250,
              aiScore: 96,
              aiRemarks: "Cholesterol medication clearly identified",
              document: "medicine_receipt.pdf"
            },
            {
              id: "MED-002",
              description: "Metformin 500mg (Himalaya Drug Company)",
              amount: 980,
              aiScore: 94,
              aiRemarks: "Diabetes medication verified",
              document: "medicine_receipt.pdf"
            },
            {
              id: "MED-003",
              description: "Aspirin 75mg (Bayer Nepal)",
              amount: 675,
              aiScore: 92,
              aiRemarks: "Blood thinner prescription verified",
              document: "medicine_receipt.pdf"
            }
          ]
        },
        lab: { 
          value: 75000, 
          confidence: 87,
          particulars: [
            {
              id: "LAB-001",
              description: "Lipid Profile Test",
              amount: 2200,
              aiScore: 91,
              aiRemarks: "Cholesterol panel test identified",
              document: "lab_report.pdf"
            },
            {
              id: "LAB-002",
              description: "ECG (Electrocardiogram)",
              amount: 1500,
              aiScore: 89,
              aiRemarks: "Cardiac test procedure verified",
              document: "ecg_report.pdf"
            },
            {
              id: "LAB-003",
              description: "2D Echo Cardiography",
              amount: 4500,
              aiScore: 85,
              aiRemarks: "Advanced cardiac imaging test",
              document: "echo_report.pdf"
            }
          ]
        },
        opd: { 
          value: 26000, 
          confidence: 92,
          particulars: [
            {
              id: "OPD-001",
              description: "Dr. अनिल शर्मा - NMC: 14789",
              amount: 850,
              aiScore: 95,
              aiRemarks: "Cardiologist consultation verified",
              document: "cardio_consultation.pdf"
            },
            {
              id: "OPD-002",
              description: "Dr. सुनीता पाण्डे - NMC: 16234",
              amount: 1200,
              aiScore: 93,
              aiRemarks: "Follow-up consultation identified",
              document: "followup_receipt.pdf"
            }
          ]
        },
        others: { 
          value: 10000, 
          confidence: 83,
          particulars: [
            {
              id: "OTH-001",
              description: "Hospital Room Charges (Norvic International Hospital)",
              amount: 6000,
              aiScore: 87,
              aiRemarks: "Accommodation charges verified",
              document: "room_charges.pdf"
            },
            {
              id: "OTH-002",
              description: "Nursing Care Services",
              amount: 2500,
              aiScore: 81,
              aiRemarks: "Professional care service charge",
              document: "nursing_receipt.pdf"
            }
          ]
        }
      },
      attachments: [
        { filename: "medical_report.pdf", url: "/dummy/medical_report.pdf", type: "pdf" },
        { filename: "test_results.jpg", url: "/dummy/test_results.jpg", type: "image" }
      ]
    } as MedicalClaimDetails
  }
];