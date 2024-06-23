import { FastifyInstance } from "fastify";
import { PostgresUserRepository } from "../repositories/user/postgres_user_repository";
import { CreateUserUseCase } from "../usecases/create_user/create_user_usecase";
import { CreateUserController } from "../http/controllers/create_user_controller";

export function userRoutes(app: FastifyInstance) {
  const postgresUserRepository = new PostgresUserRepository();
  const createUserUseCase = new CreateUserUseCase(postgresUserRepository);
  const createUserController = new CreateUserController(createUserUseCase);

  app.post("/", createUserController.handler);
}
