import { z } from 'zod';

export const MatcheEventBodySchema = z.object({
  matchId: z.uuid(),
  playerId: z.uuid().optional(),
  type: z.enum(["GOAL", "ASSIST" , "OWN_GOAL"]), 
  teamId: z.uuid()
  

});
export type MatchEventBodyInput = z.infer<typeof MatcheEventBodySchema>;