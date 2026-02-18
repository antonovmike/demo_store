import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import api from "../../api/axios";
import ResetPasswordForm from "../../components/ResetPasswordForm";

vi.mock("../../api/axios", () => ({ default: { post: vi.fn() } }));

describe("ResetPasswordForm", () => {
  test("shows invalid link if no token", () => {
    render(
      <MemoryRouter initialEntries={["/reset-password"]}>
        <Routes>
          <Route path="/reset-password" element={<ResetPasswordForm />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText(/Invalid or expired link/i)).toBeInTheDocument();
  });

  test("submits new password successfully", async () => {
    // First call: verify-reset-token
    (api.post as any).mockResolvedValueOnce({});

    // Second call: confirm-reset-password
    (api.post as any).mockResolvedValueOnce({});

    render(
      <MemoryRouter initialEntries={["/reset-password?token=abc123"]}>
        <Routes>
          <Route path="/reset-password" element={<ResetPasswordForm />} />
        </Routes>
      </MemoryRouter>,
    );

    // Wait for Form render (findBy wraps with act)
    const input = await screen.findByPlaceholderText(/Enter new password/i);
    fireEvent.change(input, { target: { value: "newPass123" } });
    fireEvent.click(screen.getByText(/Reset password/i));

    await waitFor(() =>
      expect(
        screen.getByText(/Password reset successfully!/i),
      ).toBeInTheDocument(),
    );
  });
});
