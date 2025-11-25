import { setUser } from "../userSlice";
import { describe, test, expect } from "vitest";

describe("Register reducer", () => {
  test("sets username on setUser", () => {
    let state = setUser(null);

    state = setUser({ id: "u1", username: "testuser" });
    expect(state.payload.username).toBe("testuser");
  });
});
