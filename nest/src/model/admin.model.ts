export class LoginAdminRequest {
    username: string;
    password: string;
}

export class AdminResponse {
  username: string;
  name: string;
  token?: string;
}