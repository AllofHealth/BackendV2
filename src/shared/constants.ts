import { config } from 'dotenv';
config();

export const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://3illbaby:taylorgang@pharma.ybzvrsk.mongodb.net/?retryWrites=true&w=majority';
export const PROFILE_PLACEHOLDER =
  'https://www.kindpng.com/picc/m/722-7221920_placeholder-profile-image-placeholder-png-transparent-png.png';
export const HOSPITAL_PLACEHOLDER =
  'https://www.kindpng.com/picc/m/264-2646273_hydrodent-micro-channel-icon-hospital-navigation-icon-hospital.png';
export const MEDICINE_PLACEHOLDER = 'https://pixy.org/src/144/1448676.jpg';
export const TERMILL_API_KEY = process.env.TERMILL_API_KEY;
export const TERMILL_BASE_URL = process.env.TERMILL_BASE_URL;
export const POSTMARK_SERVER_TOKEN =
  process.env.POSTMARK_SERVER_TOKEN || '3a786fc0-cc48-44f3-84e4-97263b3c3ef8';
export const ENCRYPTION_KEY = 'i02lvumS2enyb9ovJrETPRIwojy8W1X6MdQUaOO6rLc=';
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
