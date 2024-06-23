import { randomUUID } from "node:crypto";
import { knexDb } from "../../config/database/database";
import { User } from "../../entities/user";
import { CreateUserDto } from "./dto/user_dto";
import { UserRepository } from "./user_repository";

export class PostgresUserRepository implements UserRepository {
  async createUser({ name, email, session_id }: CreateUserDto): Promise<User> {
    const user = new User({
      id: randomUUID(),
      name,
      email,
      session_id,
      created_at: new Date(),
      updated_at: new Date(),
    });
    await knexDb("users").insert({
      id: user.id,
      name,
      email,
      session_id,
    });

    return user;
  }
  async findUserByEmail(email: string): Promise<User | null> {
    console.log("response", email);
    const response = await knexDb("users").where({ email }).first();
    if (!response) {
      return null;
    }
    const user = new User({
      id: response.id,
      name: response.name,
      email: response.email,
      session_id: response.session_id,
      created_at: new Date(response.created_at),
      updated_at: new Date(response.updated_at),
    });
    return user;
  }
  async findUserBySession(session_id: string): Promise<User | null> {
    const response = await knexDb("users").where({ session_id }).first();
    if (!response) {
      return null;
    }
    const user = new User({
      id: response.id,
      name: response.name,
      email: response.email,
      session_id: response.session_id,
      created_at: new Date(response.created_at),
      updated_at: new Date(response.updated_at),
    });
    return user;
  }
}
