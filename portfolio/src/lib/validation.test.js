import { contactSchema } from "@/lib/validation";

describe("contactSchema", () => {
  it("accepts valid input", () => {
    const result = contactSchema.safeParse({
      name: "Test User",
      email: "test@example.com",
      message: "Hello, this is a test message.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = contactSchema.safeParse({
      name: "Test User",
      email: "not-an-email",
      message: "Hello.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an empty name", () => {
    const result = contactSchema.safeParse({
      name: "",
      email: "test@example.com",
      message: "Hello.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an empty message", () => {
    const result = contactSchema.safeParse({
      name: "Test User",
      email: "test@example.com",
      message: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a name over 100 characters", () => {
    const result = contactSchema.safeParse({
      name: "a".repeat(101),
      email: "test@example.com",
      message: "Hello.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a message over 2000 characters", () => {
    const result = contactSchema.safeParse({
      name: "Test User",
      email: "test@example.com",
      message: "a".repeat(2001),
    });
    expect(result.success).toBe(false);
  });

  it("trims whitespace from fields", () => {
    const result = contactSchema.safeParse({
      name: "  Test User  ",
      email: "  test@example.com  ",
      message: "  Hello.  ",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Test User");
      expect(result.data.email).toBe("test@example.com");
    }
  });
});