// src/core/router.ts

/**
 * Handler type for route callbacks.
 * Receives a Request object and returns a Response (can be async).
 */
type Handler = (request: Request) => Response | Promise<Response>;

/**
 * Route definition object.
 * Stores the HTTP method, path, and handler function.
 */
type Route = {
  method: string;
  path: string;
  handler: Handler;
};

/**
 * Factory function to create a new router instance.
 * Manages route registration and request dispatching.
 */
export function createRouter() {
  // Internal array to store registered routes.
  const routes: Route[] = [];

  /**
   * Registers a GET route.
   * @param path - The route path (e.g., "/users")
   * @param handler - The handler function for GET requests
   */
  const get = (path: string, handler: Handler) => {
    routes.push({
      method: "GET",
      path,
      handler,
    });
  };

  /**
   * Registers a POST route.
   */
  const post = (path: string, handler: Handler) => {
    routes.push({
      method: "POST",
      path,
      handler,
    });
  };

  /**
   * Registers a PUT route.
   */
  const put = (path: string, handler: Handler) => {
    routes.push({
      method: "PUT",
      path,
      handler,
    });
  };

  /**
   * Registers a DELETE route.
   */
  const deleteFunc = (path: string, handler: Handler) => {
    routes.push({
      method: "DELETE",
      path,
      handler,
    });
  };

  /**
   * Main request handler.
   * Matches incoming requests to registered routes and applies security headers.
   * Returns a 404 response if no route matches.
   */
  const handle = async (request: Request) => {
    const { pathname } = new URL(request.url);
    const method = request.method;

    let response: Response | undefined;

    // Find a matching route by method and path.
    for (const route of routes) {
      if (route.method === method && route.path === pathname) {
        // Call the route handler if matched.
        response = await route.handler(request);
        break;
      }
    }

    // If no route matched, return a 404 response.
    if (!response) {
      response = new Response("Not Found", { status: 404 });
    }

    // Wrap the response to allow setting headers.
    const finalResponse = new Response(response.body, response);

    // Add security headers to every response.
    finalResponse.headers.set("X-Content-Type-Options", "nosniff");
    finalResponse.headers.set("X-Frame-Options", "DENY");
    finalResponse.headers.set("Content-Security-Policy", "default-src 'self';");
    finalResponse.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload",
    );

    return finalResponse;
  };

  // Return the router API.
  return {
    routes,
    get,
    post,
    put,
    delete: deleteFunc,
    handle,
  };
}
