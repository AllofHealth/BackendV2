import { config } from 'dotenv';
config();

export const MONGODB_URI = process.env.MONGODB_URI;
export const PROFILE_PLACEHOLDER =
  'https://www.kindpng.com/picc/m/722-7221920_placeholder-profile-image-placeholder-png-transparent-png.png';
export const HOSPITAL_PLACEHOLDER =
  'https://www.kindpng.com/picc/m/264-2646273_hydrodent-micro-channel-icon-hospital-navigation-icon-hospital.png';
export const MEDICINE_PLACEHOLDER = 'https://pixy.org/src/144/1448676.jpg';
export const TERMILL_API_KEY = process.env.TERMILL_API_KEY;
export const TERMILL_BASE_URL = process.env.TERMILL_BASE_URL;
export const POSTMARK_SERVER_TOKEN = process.env.POSTMARK_SERVER_TOKEN;
export const drugClasses: string[] = [
  'Analgesics',
  'Antibiotics',
  'Anticoagulants',
  'Antidepressants',
  'Antidiabetics',
  'Antihistamines',
  'Antihypertensives',
  'Antipsychotics',
  'Bronchodilators',
  'Corticosteroids',
  'Diuretics',
  'Hormones',
  'Immunosuppressants',
  'Lipid-Lowering Agents',
  'Muscle Relaxants',
  'Sedatives/Hypnotics',
  'Vitamins/Minerals',
  'Antivirals',
  'Antifungals',
  'Antiemetics',
  'Anesthetics',
  'Anthelmintics',
  'Anticholinergics',
  'Anticonvulsants',
  'Anti-inflammatory Agents',
  'Antimigraine Agents',
  'Antineoplastics',
  'Antiparasitics',
  'Beta-Blockers',
  'Calcium Channel Blockers',
  'Immunomodulators',
  'Opioid Analgesics',
  'Thrombolytics',
  'Uricosurics',
  'Antitubercular Agents',
  'Antiparkinson Agents',
  'Bisphosphonates',
  'Contraceptives',
  'Expectorants and Mucolytics',
  'Gastrointestinal Agents',
  'Hormone Replacement Therapy',
  'Hypoglycemics',
  'Antianginal Agents',
  'Nootropics',
  'Antiglaucoma Agents',
];
