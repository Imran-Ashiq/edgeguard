// src/core/app.test.ts
import { describe, it, expect } from "vitest";
import { createApp } from "./app";

describe("createApp", () => {
  it("should create an app instance with routing methods", () => {
    // Updated description
    const app = createApp();

    // We expect the app to be an object
    expect(app).toBeInstanceOf(Object);

    // We now expect it to have a method for adding GET routes,
    // which comes from our new router.
    expect(app).toHaveProperty("get");
    expect(app).toHaveProperty("post"); // We can check for others too!
  });

  // --- ADD THE NEW TEST BELOW ---

  it("should add secure headers to a response by default", async () => {
    const app = createApp();
    app.get("/", (req: Request) => new Response("Secure response"));

    const request = new Request("http://localhost/");
    const response = await app.handle(request);

    // Check that the headers exist and have the correct values
    expect(response.headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(response.headers.get("X-Frame-Options")).toBe("DENY");
    expect(response.headers.get("Content-Security-Policy")).toContain(
      "default-src 'self'",
    );
    expect(response.headers.get("Strict-Transport-Security")).toContain(
      "max-age=",
    );
  });

  it("should provide a privacy-safe logger on the app instance", () => {
    const app = createApp();

    const request = new Request("http://localhost/", {
      headers: { "x-forwarded-for": "123.123.123.123" },
    });

    // Call the logger method on the app instance
    const log = app.log(request);
    const parsedLog = JSON.parse(log);

    // Assert that it behaves like our logRequest function
    expect(parsedLog.method).toBe("GET");
    expect(parsedLog.headers).toBeUndefined();
  });
});
