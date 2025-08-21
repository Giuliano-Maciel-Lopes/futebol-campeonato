import { z } from 'zod';

export const MatchBodySchemaupdateStatus = z.object({
 status: z.enum(["SCHEDULED", "ONGOING" , "FINISHED"])
});
export type MatchBodyUpdateStatusInput = z.infer<typeof MatchBodySchemaupdateStatus>;