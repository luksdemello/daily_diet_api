import { User } from "../../entities/user";
import { UserAlreadyExists } from "../../errors/user_already_exists_error";

import { UserRepository } from "../../repositories/user/user_repository";

export type CreateUserInput = {
  name: string;
  email: string;
  session_id: string;
};

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(input: CreateUserInput): Promise<User> {
    const userAlreadyExists = await this.userRepository.findUserByEmail(
      input.email,
    );

    if (userAlreadyExists) {
      throw new UserAlreadyExists();
    }

    const user = await this.userRepository.createUser(input);
    return user;
  }
}
