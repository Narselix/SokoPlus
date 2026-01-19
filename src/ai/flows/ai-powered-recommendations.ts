'use server';
/**
 * @fileOverview Recommends relevant items (courses, products, jobs, campaigns) to users.
 *
 * - `getRecommendations` - A function that generates recommendations based on user data.
 * - `RecommendationsInput` - The input type for the `getRecommendations` function.
 * - `RecommendationsOutput` - The return type for the `getRecommendations` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendationsInputSchema = z.object({
  userProfile: z
    .string()
    .describe("The user's profile information, including interests and past activities."),
  availableCourses: z.string().describe('A list of available courses.'),
  availableProducts: z.string().describe('A list of available products.'),
  availableJobListings: z.string().describe('A list of available job listings.'),
  availableSolidarityCampaigns: z
    .string()
    .describe('A list of available solidarity campaigns.'),
});
export type RecommendationsInput = z.infer<typeof RecommendationsInputSchema>;

const RecommendationsOutputSchema = z.object({
  recommendedCourses: z.string().describe('A list of recommended courses.'),
  recommendedProducts: z.string().describe('A list of recommended products.'),
  recommendedJobListings: z.string().describe('A list of recommended job listings.'),
  recommendedSolidarityCampaigns: z
    .string()
    .describe('A list of recommended solidarity campaigns.'),
});
export type RecommendationsOutput = z.infer<typeof RecommendationsOutputSchema>;

export async function getRecommendations(input: RecommendationsInput): Promise<RecommendationsOutput> {
  return recommendationsFlow(input);
}

const recommendationsPrompt = ai.definePrompt({
  name: 'recommendationsPrompt',
  input: {schema: RecommendationsInputSchema},
  output: {schema: RecommendationsOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized recommendations.

  Based on the user's profile and activities, recommend relevant courses, products, job listings, and solidarity campaigns from the provided lists.

  User Profile: {{{userProfile}}}
  Available Courses: {{{availableCourses}}}
  Available Products: {{{availableProducts}}}
  Available Job Listings: {{{availableJobListings}}}
  Available Solidarity Campaigns: {{{availableSolidarityCampaigns}}}

  Consider the user's interests, past activities, and the descriptions of the available items when making your recommendations.
  Return the recommendations as comma separated lists.

  Recommended Courses:
  Recommended Products:
  Recommended Job Listings:
  Recommended Solidarity Campaigns:`,
});

const recommendationsFlow = ai.defineFlow(
  {
    name: 'recommendationsFlow',
    inputSchema: RecommendationsInputSchema,
    outputSchema: RecommendationsOutputSchema,
  },
  async input => {
    const {output} = await recommendationsPrompt(input);
    return output!;
  }
);
