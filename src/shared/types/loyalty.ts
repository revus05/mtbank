export type ApplicationStatus = "pending" | "approved" | "rejected";

export interface Application {
  id: string;
  companyName: string;
  email: string;
  phone: string;
  description: string;
  password: string;
  status: ApplicationStatus;
  createdAt: string;
}

export interface Partner {
  id: string;
  companyName: string;
  email: string;
  phone: string;
  description: string;
  approvedAt: string;
  loyaltyLevel: "silver" | "gold" | "platinum";
}

export interface Promotion {
  id: string;
  partnerId: string;
  serviceName: string;
  discount: string;
  description: string;
  createdAt: string;
}

export interface PartnerAccount {
  id: string;
  partnerId: string;
  email: string;
  password: string;
}
