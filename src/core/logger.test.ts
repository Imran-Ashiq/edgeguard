// src/core/logger.test.ts
import { describe, it, expect } from "vitest";
import { logRequest } from "./logger"; // This file doesn't exist yet!

describe("logRequest", () => {
  it("should create a structured log message without the IP address", () => {
    // Create a mock request object
    const request = new Request("http://localhost/users", {
      method: "POST",
      headers: {
        // This is where an IP address would typically be found
        "x-forwarded-for": "123.123.123.123",
      },
    });

    // Call our logger function
    const log = logRequest({ request });

    // We expect a JSON string
    const parsedLog = JSON.parse(log);

    // Check that the important, safe details are present
    expect(parsedLog.method).toBe("POST");
    expect(parsedLog.url).toBe("http://localhost/users");

    // CRUCIAL TEST: Check that sensitive headers are NOT present
    expect(parsedLog.headers).toBeUndefined();
    expect(parsedLog["x-forwarded-for"]).toBeUndefined();
  });
});
