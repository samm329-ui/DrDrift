'use server';
/**
 * @fileOverview A flow to send order data to a Google Sheet.
 *
 * - sendOrderToSheet - A function that handles sending the order data.
 * - SendOrderToSheetInput - The input type for the sendOrderToSheet function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';

const SendOrderToSheetInputSchema = z.object({
    orderDate: z.string().describe("The date of the order."),
    customerName: z.string().describe("The full name of the customer."),
    email: z.string().email().describe("The customer's email address."),
    contactNumber: z.string().describe("The customer's contact number."),
    address: z.string().describe("The customer's full shipping address."),
    pincode: z.string().describe("The shipping pincode."),
    totalAmount: z.number().describe("The total order amount."),
    items: z.string().describe("A summary of the items in the cart."),
});
export type SendOrderToSheetInput = z.infer<typeof SendOrderToSheetInputSchema>;

export async function sendOrderToSheet(input: SendOrderToSheetInput): Promise<void> {
  return sendOrderToSheetFlow(input);
}

const sendOrderToSheetFlow = ai.defineFlow(
  {
    name: 'sendOrderToSheetFlow',
    inputSchema: SendOrderToSheetInputSchema,
    outputSchema: z.void(),
  },
  async (input) => {
    try {
        const auth = new GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
            },
            scopes: 'https://www.googleapis.com/auth/spreadsheets',
        });

        const sheets = google.sheets({ version: 'v4', auth });

        const spreadsheetId = '1QxtPq6E-xc3eoyS5u65633loDMWRTVHU9EK3ZAfxHLQ';
        const range = 'Sheet1!A:H'; 

        const values = [
            [
                input.orderDate,
                input.customerName,
                input.email,
                input.contactNumber,
                input.address,
                input.pincode,
                input.items,
                input.totalAmount,
            ],
        ];

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values,
            },
        });
    } catch (e: any) {
        console.error('Error sending data to Google Sheet:', e.message);
        // We throw the error so the frontend knows the operation failed.
        throw new Error('Failed to update the order sheet. Please check server logs.');
    }
  }
);
