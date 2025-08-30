// src/core/router.test.ts
import { describe, it, expect } from "vitest";
import { createRouter } from "./router";

describe("createRouter", () => {
  it("should add a GET route to the routes array", () => {
    const router = createRouter();
    // FIX: Add the 'Request' type to the parameter
    const handler = (req: Request) => new Response("hello");

    router.get("/", handler);

    expect(router.routes[0]).toEqual({
      method: "GET",
      path: "/",
      handler: handler,
    });
  });

  it("should return a response from the correct handler", async () => {
    const router = createRouter();
    // FIX: Add the 'Request' type to the parameter here too
    const handler = (req: Request) => new Response("hello");

    router.get("/", handler);

    const request = new Request("http://localhost/");
    const response = await router.handle(request);

    expect(response.status).toBe(200);
    expect(await response.text()).toBe("hello");
  });

  it("should return a 404 response for a non-existent route", async () => {
    const router = createRouter();
    const request = new Request("http://localhost/not-found");
    const response = await router.handle(request);

    expect(response.status).toBe(404);
    expect(await response.text()).toBe("Not Found");
  });

  it("should add and handle a POST route", async () => {
    const router = createRouter();
    const handler = (req: Request) => new Response("Created!", { status: 201 });

    // 1. Register a POST route
    router.post("/users", handler);

    // 2. Check that it was stored correctly
    expect(router.routes[0]).toEqual({
      method: "POST",
      path: "/users",
      handler: handler,
    });

    // 3. Handle a matching POST request
    const request = new Request("http://localhost/users", { method: "POST" });
    const response = await router.handle(request);

    // 4. Check for the correct response
    expect(response.status).toBe(201);
    expect(await response.text()).toBe("Created!");
  });

  it("should add and handle a PUT route", async () => {
    const router = createRouter();
    const handler = (req: Request) => new Response("Updated!", { status: 200 });

    // 1. Register a PUT route
    router.put("/users/1", handler);

    // 2. Check that it was stored correctly
    expect(router.routes[0]).toEqual({
      method: "PUT",
      path: "/users/1",
      handler: handler,
    });

    // 3. Handle a matching PUT request
    const request = new Request("http://localhost/users/1", { method: "PUT" });
    const response = await router.handle(request);

    // 4. Check for the correct response
    expect(response.status).toBe(200);
    expect(await response.text()).toBe("Updated!");
  });

  it("should add and handle a DELETE route", async () => {
    const router = createRouter();
    const handler = (req: Request) => new Response("Deleted!", { status: 200 });

    // 1. Register a DELETE route
    router.delete("/users/1", handler);

    // 2. Check that it was stored correctly
    expect(router.routes[0]).toEqual({
      method: "DELETE",
      path: "/users/1",
      handler: handler,
    });

    // 3. Handle a matching DELETE request
    const request = new Request("http://localhost/users/1", {
      method: "DELETE",
    });
    const response = await router.handle(request);

    // 4. Check for the correct response
    expect(response.status).toBe(200);
    expect(await response.text()).toBe("Deleted!");
  });
});
