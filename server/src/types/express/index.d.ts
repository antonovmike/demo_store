declare global {
  namespace Express {
    interface UserPayload {
      id: number;
      email: string;
      username: string;
      role: string;
    }

    interface Request {
      user: UserPayload;
    }
  }
}

export {};
