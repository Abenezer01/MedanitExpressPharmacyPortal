// InventorySuggestions flow
'use server';
/**
 * @fileOverview Generates inventory suggestions based on historical order data and user profiles.
 *
 * - generateInventorySuggestions - A function that generates inventory suggestions.
 * - InventorySuggestionsInput - The input type for the generateInventorySuggestions function.
 * - InventorySuggestionsOutput - The return type for the generateInventorySuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InventorySuggestionsInputSchema = z.object({
  historicalOrderData: z
    .string()
    .describe('Historical order data, including medication names, quantities, and timestamps.'),
  userProfiles: z
    .string()
    .describe('User profiles, including demographics, purchase history, and health conditions.'),
});
export type InventorySuggestionsInput = z.infer<typeof InventorySuggestionsInputSchema>;

const InventorySuggestionsOutputSchema = z.object({
  suggestedOrders: z
    .string()
    .describe('Suggested orders, including medication names, quantities, and reasons for suggestion.'),
});
export type InventorySuggestionsOutput = z.infer<typeof InventorySuggestionsOutputSchema>;

export async function generateInventorySuggestions(
  input: InventorySuggestionsInput
): Promise<InventorySuggestionsOutput> {
  return inventorySuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'inventorySuggestionsPrompt',
  input: {schema: InventorySuggestionsInputSchema},
  output: {schema: InventorySuggestionsOutputSchema},
  prompt: `You are an expert pharmacy inventory manager.

  Based on the historical order data and user profiles, generate suggestions for potential orders.

  Historical Order Data: {{{historicalOrderData}}}
  User Profiles: {{{userProfiles}}}

  Consider factors such as seasonality, trends, and individual patient needs.
  Provide clear reasons for each suggested order.
  Response in markdown format.
  `,
});

const inventorySuggestionsFlow = ai.defineFlow(
  {
    name: 'inventorySuggestionsFlow',
    inputSchema: InventorySuggestionsInputSchema,
    outputSchema: InventorySuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
