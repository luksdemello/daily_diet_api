import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { CreateMealUseCase } from "../../usecases/create_meal/create_meal_use_case";

export class CreateMealController {
  constructor(private createMealUseCase: CreateMealUseCase) {}
  async handler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const createMealBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        is_ond_diet: z.boolean(),
        date: z.coerce.date(),
      });

      const { name, date, description, is_ond_diet } =
        createMealBodySchema.parse(request.body);

      await this.createMealUseCase.execute({
        name,
        date,
        description,
        is_ond_diet,
        user_id: request.user?.id ?? "",
      });
      return reply.status(201).send();
    } catch (error) {
      return reply
        .status(500)
        .send({ message: "Internal server error", error });
    }
  }
}
