import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { GetMealMetricsUseCase } from "../../usecases/get_meal_metrics/get_meal_metrics_use_case";

export class GetMealMetricsController {
  constructor(private getMealMetricsUseCase: GetMealMetricsUseCase) {}
  async handler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const paramsSchema = z.object({
        user_id: z.string(),
      });

      const { user_id } = paramsSchema.parse(request.params);

      const metrics = await this.getMealMetricsUseCase.execute({
        user_id,
      });
      return reply.status(200).send(metrics);
    } catch (error) {
      return reply
        .status(500)
        .send({ message: "Internal server error", error });
    }
  }
}
