export interface FarmerInput {
  crop: string;
  cropVariety: 'Hybrid' | 'Natural';
  seedGenetics?: string;
  landSize: number; // in acres
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  soil: {
    ph: number;
    n: number; // Nitrogen
    p: number; // Phosphorus
    k: number; // Potassium
    cec: number; // Cation Exchange Capacity
    oc: number; // Organic Carbon
    imageProvided: boolean;
  };
  irrigation: 'Drip' | 'Sprinkler' | 'Flood' | 'Rain-fed';
}

export interface FertilizerStage {
  stage: string;
  fertilizer: string;
  amountKgPerAcre: number;
  instructions: string;
}

export interface CropRecommendation {
  cropName: string;
  reason: string;
  isIntercrop: boolean;
}

export interface LandMaintenanceAdvice {
  preYield: string[];
  postYield: string[];
}

export interface SeedSuggestion {
  name: string;
  reason: string;
}

export interface LoanOption {
  schemeName: string;
  bankName: string;
  interestRate: string; // e.g., "7% p.a."
  maxAmount: string; // e.g., "Up to ₹3,00,000"
  description: string;
  isGovernmentScheme: boolean;
}

export interface PredictionResult {
  yieldPrediction: {
    value: number; // in quintals/acre
    confidence: string;
  };
  fertilizerSchedule: FertilizerStage[];
  cropRecommendations: CropRecommendation[];
  irrigationRecommendation: {
    type: 'Drip' | 'Sprinkler' | 'Flood' | 'Rain-fed';
    reason: string;
  };
  pestAlert: {
    riskLevel: 'Low' | 'Medium' | 'High';
    details: string;
  };
  sustainabilityMetrics: {
    carbonFootprintKgCo2e: number;
    score: number; // out of 100
  };
  landMaintenance: LandMaintenanceAdvice;
}

export type View = 'input' | 'dashboard' | 'maintenance' | 'market' | 'reports' | 'loans';

export type Language = 'en' | 'hi' | 'or' | 'ta' | 'ta_en';

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  image?: string; // base64 data URL
}

export const supportedLanguages: { code: Language; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी (Hindi)' },
  { code: 'or', name: 'ଓଡ଼ିଆ (Odia)' },
  { code: 'ta', name: 'தமிழ் (Tamil)' },
  { code: 'ta_en', name: 'Tanglish' },
];