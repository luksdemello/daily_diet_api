import { FastifyReply, FastifyRequest } from "fastify";
import { PostgresUserRepository } from "../repositories/user/postgres_user_repository";

export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userRepository = new PostgresUserRepository();
  const session_id = request.cookies.session_id;
  if (!session_id) {
    return reply.status(401).send({ error: "Unauthorized" });
  }

  const user = await userRepository.findUserBySession(session_id);
  if (!user) {
    return reply.status(401).send({ error: "Unauthorized" });
  }

  request.user = user;
}
