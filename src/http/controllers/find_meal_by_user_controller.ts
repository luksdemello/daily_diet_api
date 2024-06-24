import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { FindMealsByUserUseCase } from "../../usecases/find_meals_by_user/find_meals_by_useruse_case";

export class FindMealsByUserController {
  constructor(private findMealsByUserlUseCase: FindMealsByUserUseCase) {}
  async handler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const paramsSchema = z.object({
        user_id: z.string(),
      });

      const { user_id } = paramsSchema.parse(request.params);

      const meal = await this.findMealsByUserlUseCase.execute({
        user_id,
      });
      return reply.status(200).send(meal);
    } catch (error) {
      return reply
        .status(500)
        .send({ message: "Internal server error", error });
    }
  }
}
