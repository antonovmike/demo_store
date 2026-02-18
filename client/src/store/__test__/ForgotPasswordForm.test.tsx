import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";

import api from "../../api/axios";
import ForgotPasswordForm from "../../components/ForgotPasswordForm";

vi.mock("../../api/axios", () => ({ default: { post: vi.fn() } }));

describe("ForgotPasswordForm", () => {
  test("shows success message when email exists", async () => {
    (api.post as any).mockResolvedValueOnce({ status: 200, data: {} }); // mock requestPasswordReset success

    render(
      <MemoryRouter initialEntries={["/forgot-password"]}>
        <Routes>
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        </Routes>
      </MemoryRouter>,
    );

    const input = screen.getByPlaceholderText(/Enter your email/i);
    fireEvent.change(input, { target: { value: "user@example.com" } });
    fireEvent.click(screen.getByText(/Reset password/i));

    await waitFor(() =>
      expect(
        screen.getByText(/Check your email for reset instructions/i),
      ).toBeInTheDocument(),
    );
  });

  test("shows error message when email not found", async () => {
    (api.post as any).mockRejectedValueOnce({ response: { status: 404 } });

    render(
      <MemoryRouter initialEntries={["/forgot-password"]}>
        <Routes>
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        </Routes>
      </MemoryRouter>,
    );

    const input = screen.getByPlaceholderText(/Enter your email/i);
    fireEvent.change(input, { target: { value: "notfound@example.com" } });
    fireEvent.click(screen.getByText(/Reset password/i));

    await waitFor(() =>
      expect(screen.getByText(/Email not found/i)).toBeInTheDocument(),
    );
  });
});
