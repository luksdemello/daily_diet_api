import { User } from "../entities/user";

declare module "fastify" {
  export interface FastifyRequest {
    user?: User;
  }
}
