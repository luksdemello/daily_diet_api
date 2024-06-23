import { User } from "../entities/user";
import { UserRepository } from "../repositories/user/user_repository";

export type CreateUserInput = {
  name: string;
  email: string;
  session_id: string;
};

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute(input: CreateUserInput): Promise<User> {
    await this.userRepository.createUser(input);

    const user = new User({
      id: "id",
      name: "name",
      email: "email",
      session_id: "session_id",
      created_at: new Date(),
      updated_at: new Date(),
    });
    return user;
  }
}
