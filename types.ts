export interface CompanyProfile {
  id: string;
  name: string;
  logoBase64?: string;
  tagline: string;
  address: string;
  vatNumber: string;
  crNumber: string;
  contactPerson: string;
  bankDetails: string;
  primaryColor: string;
}

export interface LineItem {
  id:string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export enum QuoteTemplate {
  STANDARD = 'Standard',
  CORPORATE = 'Corporate',
  CREATIVE = 'Creative',
}

export interface Quote {
  id: string;
  quoteNumber: string;
  date: string;
  validity: string;
  customerName: string;
  subject: string;
  companyProfileId: string;
  lineItems: LineItem[];
  vatRate: number; // e.g., 15 for 15%
  currency: string;
  template: QuoteTemplate;
}

export enum Page {
  QUOTE_CREATOR,
  PROFILE_MANAGER,
}