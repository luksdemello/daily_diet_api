import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { FindMealByIdUseCase } from "../../usecases/find_meal_by_id/find_meal_by_id_use_case";

export class FindMealByIdController {
  constructor(private findMealByIdUseCase: FindMealByIdUseCase) {}
  async handler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const paramsSchema = z.object({
        meal_id: z.string(),
      });

      const { meal_id } = paramsSchema.parse(request.params);

      const meal = await this.findMealByIdUseCase.execute({
        meal_id,
      });
      return reply.status(200).send({ meal });
    } catch (error) {
      return reply
        .status(500)
        .send({ message: "Internal server error", error });
    }
  }
}
