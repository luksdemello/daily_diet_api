import { describe, it, expect, vi } from "vitest";
import { CreateUserInput, CreateUserUseCase } from "./create_user_usecase";
import { UserRepository } from "../../repositories/user/user_repository";
import { User } from "../../entities/user";
import { CreateUserDto } from "../../repositories/user/dto/user_dto";
import { UserAlreadyExists } from "../../errors/user_already_exists_error";

const mockUserResponse = (): User => {
  return new User({
    id: "any_id",
    email: "any_email",
    name: "any_namel",
    session_id: "any_session",
    created_at: new Date(),
    updated_at: new Date(),
  });
};

class UserRepositoryStub implements UserRepository {
  async findUserByEmail(email: string): Promise<User | null> {
    return null;
  }
  async findUserBySession(session_id: string): Promise<User | null> {
    return null;
  }
  async createUser(data: CreateUserDto): Promise<User> {
    const user = mockUserResponse();
    user.email = data.email;
    user.name = data.name;
    user.session_id = data.session_id;
    return user;
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
    const input = makeSutInput();
    const response = await sut.execute(input);
    expect(response).toBeInstanceOf(User);
    expect(response.id).toBeTruthy();
    expect(response.created_at).toBeTruthy();
    expect(response.updated_at).toBeTruthy();
    expect(response.email).toEqual(input.email);
    expect(response.name).toEqual(input.name);
    expect(response.session_id).toEqual(input.session_id);
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

  it("shoud throws if findUserById throws", async () => {
    const { sut, userRepository } = makeSut();
    vi.spyOn(userRepository, "findUserByEmail").mockImplementationOnce(() => {
      throw new Error();
    });
    const input = makeSutInput();
    const promise = sut.execute(input);
    expect(promise).rejects.toThrow();
  });

  it("shoud throws if user email already exists", async () => {
    const { sut, userRepository } = makeSut();
    vi.spyOn(userRepository, "findUserByEmail").mockImplementationOnce(
      (_: string) => {
        const user = mockUserResponse();
        return Promise.resolve(user);
      },
    );
    const input = makeSutInput();
    const promise = sut.execute(input);
    expect(promise).rejects.toThrow(UserAlreadyExists);
  });
});
