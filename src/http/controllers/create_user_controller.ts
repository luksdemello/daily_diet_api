import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserUseCase } from "../../usecases/create_user/create_user_usecase";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { UserAlreadyExists } from "../../errors/create_user_errors";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}
  async handler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const createUserBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
      });

      let session_id = request.cookies.session_id;

      if (!session_id) {
        session_id = randomUUID();

        reply.setCookie("session_id", session_id, {
          path: "/",
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        });
      }
      const { name, email } = createUserBodySchema.parse(request.body);

      await this.createUserUseCase.execute({
        name,
        email,
        session_id,
      });
      return reply.status(201).send();
    } catch (error) {
      if (error instanceof UserAlreadyExists) {
        return reply.send(400).send({ message: error.message });
      }

      return reply.status(500).send({ message: "Internal server error" });
    }
  }
}
