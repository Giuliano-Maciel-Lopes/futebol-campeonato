import { env } from "@/utils/env";

const authConfig = {
  jwt: {
    secret:env.JWT_SECRET ,
    expiresIn: "1d",
  },
};

export { authConfig };
