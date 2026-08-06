import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Education from "@/components/Education";

// Reveal wraps its children in framer-motion, which needs a browser-like
// environment for animations -- mock it to a plain div so this test stays
// fast and focused on Education's own content, not animation internals.
jest.mock("@/components/Reveal", () => {
  function MockReveal({ children }) {
    return <div>{children}</div>;
  }
  return MockReveal;
});

describe("Education", () => {
  it("renders all three education entries", () => {
    render(<Education />);
    expect(screen.getByText("VIT Bhopal University")).toBeInTheDocument();
    expect(screen.getAllByText("DAV Public School")).toHaveLength(2);
  });

  it("shows the CGPA for VIT Bhopal", () => {
    render(<Education />);
    expect(screen.getByText(/7.99/)).toBeInTheDocument();
  });
});