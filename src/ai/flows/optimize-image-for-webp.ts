'use server';

/**
 * @fileOverview Determines whether a given image should be converted to a static or animated WebP format for optimal performance.
 *
 * - optimizeImageForWebP - Analyzes an image and suggests the best WebP format.
 * - OptimizeImageForWebPInput - The input type for the optimizeImageForWebP function.
 * - OptimizeImageForWebPOutput - The return type for the optimizeImageForWebP function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeImageForWebPInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "The image to optimize, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type OptimizeImageForWebPInput = z.infer<typeof OptimizeImageForWebPInputSchema>;

const OptimizeImageForWebPOutputSchema = z.object({
  recommendation: z
    .enum(['static', 'animated'])
    .describe('Recommendation for WebP format: static or animated.'),
  reason: z.string().describe('The reason for the recommendation.'),
});
export type OptimizeImageForWebPOutput = z.infer<typeof OptimizeImageForWebPOutputSchema>;

export async function optimizeImageForWebP(input: OptimizeImageForWebPInput): Promise<OptimizeImageForWebPOutput> {
  return optimizeImageForWebPFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeImageForWebPPrompt',
  input: {schema: OptimizeImageForWebPInputSchema},
  output: {schema: OptimizeImageForWebPOutputSchema},
  prompt: `You are an image optimization expert. You will analyze the provided image and determine whether it should be converted to a static or animated WebP format for optimal performance and visual quality. Explain your reasoning.

Image: {{media url=imageDataUri}}

Consider these factors:
*   If the image is already animated, recommend animated WebP.
*   If the image contains complex scenes that translate poorly to animation, recommend static WebP.
*   If the image is static and simple, recommend static WebP.

Based on your analysis, provide a recommendation and a brief explanation.
`,
});

const optimizeImageForWebPFlow = ai.defineFlow(
  {
    name: 'optimizeImageForWebPFlow',
    inputSchema: OptimizeImageForWebPInputSchema,
    outputSchema: OptimizeImageForWebPOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
