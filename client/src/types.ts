export interface ManagedUser {
  id: number;
  name: string;
  email: string;
  role: string; // "user" | "admin" | "editor"
}
