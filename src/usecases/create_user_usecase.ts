import { User } from "../entities/user.js";

export class CreateUserUseCase {
  async execute(): Promise<User> {
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
