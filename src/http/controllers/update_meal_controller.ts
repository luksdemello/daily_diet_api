import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UpdateMealUseCase } from "../../usecases/update_meal/update_meal_use_case";

export class UpdateMealController {
  constructor(private updateMealUseCase: UpdateMealUseCase) {}
  async handler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const paramsSchema = z.object({ meal_id: z.string().uuid() });

      const { meal_id } = paramsSchema.parse(request.params);
      const updateMealBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        is_on_diet: z.boolean(),
        date: z.coerce.date(),
      });

      const { name, date, description, is_on_diet } =
        updateMealBodySchema.parse(request.body);

      await this.updateMealUseCase.execute({
        name,
        date,
        description,
        id: meal_id,
        is_on_diet,
        update_at: new Date(),
      });
      return reply.status(204).send();
    } catch (error) {
      return reply
        .status(500)
        .send({ message: "Internal server error", error });
    }
  }
}
