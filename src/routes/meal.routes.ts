import { FastifyInstance } from "fastify";
import { PostgresUserRepository } from "../repositories/user/postgres_user_repository";
import { PostgresMealRepository } from "../repositories/meal/postgres_meal_repository";
import { CreateMealController } from "../http/controllers/create_meal_controller";
import { CreateMealUseCase } from "../usecases/create_meal/create_meal_use_case";
import { FindMealsByUserUseCase } from "../usecases/find_meals_by_user/find_meals_by_useruse_case";
import { FindMealsByUserController } from "../http/controllers/find_meal_by_user_controller";
import { FindMealByIdUseCase } from "../usecases/find_meal_by_id/find_meal_by_id_use_case";
import { FindMealByIdController } from "../http/controllers/find_meal_by_id_controller";
import { UpdateMealUseCase } from "../usecases/update_meal/update_meal_use_case";
import { UpdateMealController } from "../http/controllers/update_meal_controller";
import { DeleteMealUseCase } from "../usecases/delete_meal/delete_meal_use_case";
import { DeleteMealController } from "../http/controllers/delete_meal_controller";
import { GetMealMetricsUseCase } from "../usecases/get_meal_metrics/get_meal_metrics_use_case";
import { GetMealMetricsController } from "../http/controllers/get_metrics";
import { authMiddleware } from "../middlewares/auth_middleware";

export async function mealRoutes(app: FastifyInstance) {
  const postgresMealRepository = new PostgresMealRepository();
  const postgresUserRepository = new PostgresUserRepository();

  const createMealUseCase = new CreateMealUseCase(postgresMealRepository);
  const createMealController = new CreateMealController(createMealUseCase);

  const findMealsByUserUseCase = new FindMealsByUserUseCase(
    postgresMealRepository,
  );
  const findMealsByUserController = new FindMealsByUserController(
    findMealsByUserUseCase,
  );

  const findMealByIdUseCase = new FindMealByIdUseCase(postgresMealRepository);
  const findMealByIdController = new FindMealByIdController(
    findMealByIdUseCase,
  );

  const updateMealUseCase = new UpdateMealUseCase(postgresMealRepository);
  const updateMealController = new UpdateMealController(updateMealUseCase);

  const deleteMealUseCase = new DeleteMealUseCase(postgresMealRepository);
  const deleteMealController = new DeleteMealController(deleteMealUseCase);

  const getMealMetricsUseCase = new GetMealMetricsUseCase(
    postgresMealRepository,
  );
  const getMealMetricsController = new GetMealMetricsController(
    getMealMetricsUseCase,
  );

  app.post("/", { preHandler: authMiddleware }, async (request, reply) =>
    createMealController.handler(request, reply),
  );

  app.get("/", { preHandler: authMiddleware }, async (request, reply) =>
    findMealsByUserController.handler(request, reply),
  );

  app.get("/:meal_id", { preHandler: authMiddleware }, async (request, reply) =>
    findMealByIdController.handler(request, reply),
  );

  app.put("/:meal_id", { preHandler: authMiddleware }, async (request, reply) =>
    updateMealController.handler(request, reply),
  );

  app.delete(
    "/:meal_id",
    { preHandler: authMiddleware },
    async (request, reply) => deleteMealController.handler(request, reply),
  );

  app.get("/metrics", { preHandler: authMiddleware }, async (request, reply) =>
    getMealMetricsController.handler(request, reply),
  );
}
