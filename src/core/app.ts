// src/core/app.ts

// Import the router factory, which manages route registration and request handling.
import { createRouter } from "./router";

// Import the privacy-safe logger function.
import { logRequest } from "./logger";

/**
 * Factory function to create a new EdgeGuard application instance.
 * The returned object provides routing methods, a request handler, and a privacy-safe logger.
 */
export function createApp() {
  // Create a new router instance to manage routes.
  const router = createRouter();

  // The app object exposes routing methods and utilities.
  const app = {
    // Register route handlers for different HTTP methods.
    get: router.get,
    post: router.post,
    put: router.put,
    delete: router.delete,

    // Main request handler for edge environments (e.g., fetch event).
    handle: router.handle,

    // Privacy-safe logger for incoming requests.
    log: (request: Request) => logRequest({ request }),
  };

  // Return the app instance.
  return app;
}
