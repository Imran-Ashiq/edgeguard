// src/core/logger.ts

/**
 * Arguments for the logRequest function.
 * Only the request object is accepted to ensure privacy.
 */
type LogRequestArgs = {
  request: Request;
};

/**
 * Generates a privacy-safe log message for an incoming request.
 * Only includes non-sensitive properties (method and url).
 * Does NOT log headers or IP addresses.
 */
export function logRequest({ request }: LogRequestArgs): string {
  // Select only safe properties for logging.
  const logObject = {
    method: request.method,
    url: request.url,
  };

  // Return the log as a JSON string.
  return JSON.stringify(logObject);
}
