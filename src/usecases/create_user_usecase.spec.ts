import { describe, it, expect, vi } from "vitest";
import { CreateUserInput, CreateUserUseCase } from "./create_user_usecase";
import { User } from "../entities/user";
import { UserRepository } from "../repositories/user/user_repository";
import { CreateUserDto } from "../repositories/user/dto/user_dto";
import { CreateUserError } from "../errors/create_user_errors";

class UserRepositoryStub implements UserRepository {
  async findUserByEmail(email: string): Promise<User | null> {
    return null;
  }
  async createUser(data: CreateUserDto): Promise<User> {
    return new User({
      id: "any_id",
      email: data.email,
      name: data.name,
      session_id: data.session_id,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }
}

type SutType = {
  userRepository: UserRepository;
  sut: CreateUserUseCase;
};

const makeSut = (): SutType => {
  const userRepository = new UserRepositoryStub();
  const createUserUseCase = new CreateUserUseCase(userRepository);
  return {
    userRepository,
    sut: createUserUseCase,
  };
};

const makeSutInput = (): CreateUserInput => {
  const sutInput: CreateUserInput = {
    name: "any_name",
    email: "any_email",
    session_id: "any_session",
  };

  return sutInput;
};

describe("CreateUserUseCase", () => {
  it("shoud return an user", async () => {
    const { sut } = makeSut();
    const response = await sut.execute(makeSutInput());
    expect(response).toBeInstanceOf(User);
    expect(response.id).toBeTruthy();
    expect(response.created_at).toBeTruthy();
    expect(response.updated_at).toBeTruthy();
  });

  it("shoud call createUser in UserRepository with correct values", async () => {
    const { sut, userRepository } = makeSut();
    const userRepositorySpy = vi.spyOn(userRepository, "createUser");
    const input = makeSutInput();
    await sut.execute(input);
    expect(userRepositorySpy).toHaveBeenCalledOnce();
    expect(userRepositorySpy).toHaveBeenCalledWith(input);
  });

  it("shoud throws if createUser throws", async () => {
    const { sut, userRepository } = makeSut();
    vi.spyOn(userRepository, "createUser").mockImplementationOnce(() => {
      throw new Error();
    });
    const input = makeSutInput();
    const promise = sut.execute(input);
    expect(promise).rejects.toThrow();
  });

  it("shoud call findUserByEmail in UserRepository with correct values", async () => {
    const { sut, userRepository } = makeSut();
    const userRepositorySpy = vi.spyOn(userRepository, "findUserByEmail");
    const input = makeSutInput();
    await sut.execute(input);
    expect(userRepositorySpy).toHaveBeenCalledOnce();
    expect(userRepositorySpy).toHaveBeenCalledWith(input.email);
  });
});
