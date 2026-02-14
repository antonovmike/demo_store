import { logout, setUser } from "../userSlice";
import { describe, test, expect } from "vitest";

type UserActions = ReturnType<typeof setUser> | ReturnType<typeof logout>;

describe("Register reducer", () => {
  test("sets username on setUser", () => {
    let action: UserActions;
    action = setUser({ id: "u1", username: "testuser" });
    expect(action.payload.username).toBe("testuser");

    action = logout();
    expect(action.type).toBe("user/logout");
  });
});
