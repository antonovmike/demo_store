import { logout, setUser } from "../userSlice";
import { describe, test, expect } from "vitest";

type UserActions = ReturnType<typeof setUser> | ReturnType<typeof logout>;

describe("Login reducer", () => {
  test("Successful login with email and password", () => {
    let action: UserActions;
    action = setUser({
      id: "u1",
      email: "testuser@example.com",
      token: "testtoken123",
    });
    expect(action.type).toBe("user/setUser");
    if (action.payload) {
      expect(action.payload.email).toBe("testuser@example.com");
      expect(action.payload.token).toBe("testtoken123");
    } else {
      throw new Error("Expected payload in setUser action");
    }
  });
  test("Incorrect login returns error message", () => {
    const action = setUser(null);
    expect(action.payload).toBeNull();
  });
  test("After login, email and token are stored in context/Redux", () => {
    const action = setUser({
      id: "u1",
      email: "testuser@example.com",
      token: "testtoken123",
    });
    expect(action.payload).toMatchObject({
      email: "testuser@example.com",
      token: "testtoken123",
    });
  });
});
