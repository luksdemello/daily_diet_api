import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../repositories/user/user_repository";

export class AuthMiddleware {
  constructor(private userRepository: UserRepository) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const session_id = request.cookies.session_id;
    if (!session_id) {
      return reply.status(401).send({ error: "Unauthorized" });
    }

    const user = await this.userRepository.findUserBySession(session_id);
    if (!user) {
      return reply.status(401).send({ error: "Unauthorized" });
    }

    request.user = user;
  }
}
