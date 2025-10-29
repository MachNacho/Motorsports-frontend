import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import type { Mock } from "vitest";
import SignInPage from "../Pages/Auth/SignInPage";
import { useAuth } from "../context/AuthContext";
import { accountService } from "../API/Services/accountService";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

vi.mock("../context/AuthContext.tsx", () => ({
  useAuth: vi.fn(() => ({ login: vi.fn() })),
}));

vi.mock("../API/Services/accountService.ts", () => ({
  accountService: { login: vi.fn() },
}));

const renderWithProviders = () => {
  const queryClient = new QueryClient();
  return render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <SignInPage />
      </QueryClientProvider>
    </BrowserRouter>
  );
};
describe("SignInPage", () => {
  it("renders username and password inputs", () => {
    renderWithProviders();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("toggles password visibility", () => {
    renderWithProviders();
    const toggleBtn = screen.getByRole("button", { name: /Show password/i });
    fireEvent.click(toggleBtn);
    expect(
      screen.getByRole("button", { name: /Hide password/i })
    ).toBeInTheDocument();
  });
  it("shows error snackbar on failed login", async () => {
    (accountService.login as Mock).mockRejectedValueOnce({
      response: { status: 401 },
      isAxiosError: true,
    });

    renderWithProviders();
    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "user" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

    await waitFor(() =>
      expect(
        screen.getByText(/Unauthorized. Please check your credentials./i)
      ).toBeInTheDocument()
    );
  });
});
it("redirects on successful login", async () => {
  const mockLogin = vi.fn();
  (useAuth as Mock).mockReturnValue({ login: mockLogin });
  (accountService.login as Mock).mockResolvedValueOnce({
    token: "jwt-token",
  });

  renderWithProviders();
  fireEvent.change(screen.getByLabelText(/Username/i), {
    target: { value: "driver" },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "correct" },
  });
  fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

  await waitFor(() =>
    expect(screen.getByText(/Login successful/i)).toBeInTheDocument()
  );
  expect(mockLogin).toHaveBeenCalledWith("jwt-token");
});
