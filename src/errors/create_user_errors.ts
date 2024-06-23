export class CreateUserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CreateUserError";
  }
}

export class UserAlreadyExists extends Error {
  constructor() {
    super("User already exists");
    this.name = "UserAlreadyExists";
  }
}
