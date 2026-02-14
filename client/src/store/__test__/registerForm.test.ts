import { logout, setUser } from "../userSlice";
import { describe, test, expect } from "vitest";

type UserActions = ReturnType<typeof setUser> | ReturnType<typeof logout>;

describe("Register reducer", () => {
  test("sets username on setUser", () => {
    let action: UserActions;
    action = setUser({ id: "u1", username: "testuser" });
    if ("payload" in action && action.payload) {
      expect(action.payload.username).toBe("testuser");
    } else {
      throw new Error("Expected payload in setUser action");
    }
  });
  test("logout returns correct type", () => {
    const action: ReturnType<typeof logout> = logout();
    expect(action.type).toBe("user/logout");
  });
});
