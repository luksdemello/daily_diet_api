import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { DeleteMealUseCase } from "../../usecases/delete_meal/delete_meal_use_case";

export class DeleteMealController {
  constructor(private deleteMealUseCase: DeleteMealUseCase) {}
  async handler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const paramsSchema = z.object({
        meal_id: z.string(),
      });

      const { meal_id } = paramsSchema.parse(request.params);

      const meal = await this.deleteMealUseCase.execute({
        meal_id,
      });
      return reply.status(204).send(meal);
    } catch (error) {
      return reply
        .status(500)
        .send({ message: "Internal server error", error });
    }
  }
}
