import { config } from 'dotenv';
config();

import '@/ai/flows/optimize-image-for-webp.ts';
import '@/ai/flows/send-feedback-email.ts';
import '@/ai/flows/send-order-to-sheet.ts';
