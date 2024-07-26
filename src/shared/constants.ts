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
