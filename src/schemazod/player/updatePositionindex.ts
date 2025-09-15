import { z } from "zod";

export const PlayerSlotSchema = z.object({
  id: z.string(),               // id do player
  positionIndex: z.number(),    // posição no time

});

export const TeamFormationSchema = z.object({
  teamId: z.string(),
  players: z.array(PlayerSlotSchema), // titulares e reservas juntos
});

export type PlayerSlot = z.infer<typeof PlayerSlotSchema>;
export type TeamFormation = z.infer<typeof TeamFormationSchema>;