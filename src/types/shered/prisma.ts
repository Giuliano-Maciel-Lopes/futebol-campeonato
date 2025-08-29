
import type {
  User as PrismaUser,
  Team as PrismaTeam,
  Player as PrismaPlayer,
  Match as PrismaMatch,
  MatchEvent as PrismaMatchEvent,
  Invite as PrismaInvite,
  Group as PrismaGroup,
  GroupScore as PrismaGroupScore,
} from "@prisma/client";

export type User = PrismaUser;
export type Team = PrismaTeam;
export type Player = PrismaPlayer;
export type Match = PrismaMatch;
export type MatchEvent = PrismaMatchEvent;
export type Invite = PrismaInvite;
export type Group = PrismaGroup;
export type GroupScore = PrismaGroupScore;
