import api from "./axios";

export async function requestPasswordReset(email: string) {
  return api.post("/users/reset-password", { email });
}
