import { z } from "zod";
import { RoleType } from "@prisma/client";

export const newProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  role: z.nativeEnum(RoleType),
  skills: z.array(z.string()),
  bio: z.string(),
  github: z.string(),
  linkedin: z.string(),
  website: z.string(),
  profilePic: z.string(),
});
