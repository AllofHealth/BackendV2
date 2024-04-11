import { config } from 'dotenv';
config();

export const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://thrill:taylorgang@cluster0.4k3modo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
