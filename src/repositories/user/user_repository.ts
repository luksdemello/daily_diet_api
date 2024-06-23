import { User } from "../../entities/user";
import { CreateUserDto } from "./dto/user_dto";

export interface UserRepository {
  createUser(data: CreateUserDto): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
}
