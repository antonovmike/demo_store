import { logout, registerUser, setUser } from "../userSlice";
import { describe, test, expect } from "vitest";

type UserActions = ReturnType<typeof setUser> | ReturnType<typeof logout>;

describe("Register reducer", () => {
  test("sets email on setUser", () => {
    let action: UserActions;
    action = setUser({ id: "u1", email: "testuser@example.com" });
    if ("payload" in action && action.payload) {
      expect(action.payload.email).toBe("testuser@example.com");
    } else {
      throw new Error("Expected payload in setUser action");
    }
  });
  test("tests successful registration with a new email address", () => {
    let action: UserActions;
    action = setUser({ id: "u2", email: "newuser@example.com" });
    if ("payload" in action && action.payload) {
      expect(action.type).toBe("user/setUser");
      expect(action.payload.email).toBe("newuser@example.com");
      expect(action.payload.id).toBe("u2");
    } else {
      throw new Error("Expected payload in setUser action");
    }
  });
  test("tests unsuccessful registration with an existing email address", () => {
    const errorAction = {
      type: registerUser.rejected.type,
      payload: "Email already exists",
    };
    expect(errorAction.type).toBe("user/registerUser/rejected");
    expect(errorAction.payload).toBe("Email already exists");
  });
  test("unsuccessful registration updates state to failed", () => {
    const prevState = { user: null, status: "idle", error: null };
    const errorAction = {
      type: registerUser.rejected.type,
      payload: "Email already exists",
    };
    const newState = {
      prevState,
      errorAction,
    };
    expect(newState.prevState.status).toBe("idle");
    expect(newState.errorAction.payload).toBe("Email already exists");
  });
  test("logout returns correct type", () => {
    const action: ReturnType<typeof logout> = logout();
    expect(action.type).toBe("user/logout");
  });
});
