'use server';
/**
 * @fileOverview A flow to send an email with feedback.
 *
 * - sendFeedbackEmail - A function that handles sending the feedback email.
 * - SendFeedbackEmailInput - The input type for the sendFeedbackEmail function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import sgMail from '@sendgrid/mail';

const SendFeedbackEmailInputSchema = z.object({
  name: z.string().describe('The name of the person sending feedback.'),
  email: z.string().email().describe('The email of the person sending feedback.'),
  message: z.string().describe('The feedback message.'),
});
export type SendFeedbackEmailInput = z.infer<typeof SendFeedbackEmailInputSchema>;

export async function sendFeedbackEmail(input: SendFeedbackEmailInput): Promise<void> {
  return sendFeedbackEmailFlow(input);
}

const sendFeedbackEmailFlow = ai.defineFlow(
  {
    name: 'sendFeedbackEmailFlow',
    inputSchema: SendFeedbackEmailInputSchema,
    outputSchema: z.void(),
  },
  async (input) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
    const msg = {
        to: 'drdriftpvtltd@gmail.com',
        from: 'feedback@drdrift.com', 
        subject: `New Feedback from ${input.name}`,
        text: `You have received new feedback.\n\nName: ${input.name}\nEmail: ${input.email}\nMessage: ${input.message}`,
        html: `<p>You have received new feedback.</p><p><strong>Name:</strong> ${input.name}</p><p><strong>Email:</strong> ${input.email}</p><p><strong>Message:</strong></p><p>${input.message}</p>`,
    };
    await sgMail.send(msg);
  }
);
