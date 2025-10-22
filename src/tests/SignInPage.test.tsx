import { render, screen } from "@testing-library/react";
import SignInPage from "../Pages/SigninPage/SignInPage";
import { describe, it, expect } from "vitest";

describe("SignIN", () => {
  it("Renders heading", () => {
    render(<SignInPage />);
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });
});
