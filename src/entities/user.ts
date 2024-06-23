export class User {
  id: string;
  name: string;
  email: string;
  session_id: string;
  created_at: Date;
  updated_at: Date;

  constructor({ id, name, email, session_id, created_at, updated_at }: User) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.session_id = session_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
