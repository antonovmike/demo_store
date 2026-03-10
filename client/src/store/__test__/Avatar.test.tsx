import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { describe, expect, test, vi } from "vitest";

import { AuthContext } from "../../context/AuthContext";
import api from "../../api/axios";
import ProfilePage from "../../components/ProfilePage";
import profileReducer from "../profileSlice";
import userReducer from "../userSlice";

vi.mock("../../api/axios", () => ({
  default: { put: vi.fn(), post: vi.fn() },
}));

vi.mock("../profileSlice", async () => {
  const actual =
    await vi.importActual<typeof import("../profileSlice")>("../profileSlice");
  return {
    ...actual,
    fetchProfile: () => ({ type: "profile/fetchMock" }),
  };
});

function renderWithProviders(ui: React.ReactNode, preloadedState?: any) {
  const rootReducer = combineReducers({
    profile: profileReducer,
    user: userReducer,
  });
  const store = configureStore({ reducer: rootReducer, preloadedState });

  const mockAuth = {
    user: {
      id: 1,
      username: "testuser",
      email: "test@example.com",
      avatarPath: "/avatars/old.png",
    },
    setUser: vi.fn(),
    email: "test@example.com",
    setEmail: vi.fn(),
    token: "fake-token",
    setToken: vi.fn(),
    logout: vi.fn(),
  } as any;

  return render(
    <Provider store={store}>
      <AuthContext.Provider value={mockAuth}>{ui}</AuthContext.Provider>
    </Provider>,
  );
}

describe("Avatar upload", () => {
  test("shows preview when uploading avatar for new user", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/profile"]}>
        <Routes>
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </MemoryRouter>,
      {
        profile: {
          data: {
            id: 1,
            username: "newuser",
            email: "new@example.com",
            avatarPath: null,
          },
          loading: false,
          error: null,
        },
        user: {},
      },
    );

    const button = await waitFor(() => screen.findByText(/Change Avatar/i));
    const fileInput = button.querySelector("input")!;
    const file = new File(["dummy"], "avatar.png", { type: "image/png" });

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByTestId("avatar-cropper")).toBeInTheDocument();
    });
  });

  test("calls API when saving avatar for existing user", async () => {
    (api.put as any).mockResolvedValueOnce({
      status: 200,
      data: { avatarPath: "/avatars/new.png" },
    });

    renderWithProviders(
      <MemoryRouter initialEntries={["/profile"]}>
        <Routes>
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </MemoryRouter>,
      {
        profile: {
          data: {
            id: 1,
            username: "testuser",
            email: "test@example.com",
            avatarPath: "/avatars/old.png",
          },
          loading: false,
          error: null,
        },
        user: {},
      },
    );

    await waitFor(() =>
      expect(screen.getByText(/Change Avatar/i)).toBeInTheDocument(),
    );

    const button = await waitFor(() => screen.findByText(/Change Avatar/i));

    const fileInput = button.querySelector("input")!;

    const file = new File(["dummy"], "newavatar.png", { type: "image/png" });

    fireEvent.change(fileInput, { target: { files: [file] } });
    fireEvent.submit(screen.getByText(/Save Avatar/i).closest("form")!);

    await waitFor(() => {
      expect(api.put).toHaveBeenCalled();
    });
  });
});
