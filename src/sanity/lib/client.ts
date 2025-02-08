import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'
export const client = createClient({
  projectId,
  token: process.env.NEXT_SANITY_TOKAN,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
