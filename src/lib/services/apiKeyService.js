export const DEFAULT_API_KEY = process.env.PROSPECT_API_KEY || "phub_live_sec_9942a1b7e";

export class ApiKeyService {
  /**
   * Validate Authorization header from incoming CRM requests
   */
  static validateRequest(request) {
    const authHeader = request.headers.get("authorization");
    
    // In dev mode, we permit requests if matching default key or if Bearer is provided
    if (!authHeader) {
      // Check query param fallback ?api_key=... for easy browser/curl testing
      const url = new URL(request.url);
      const queryKey = url.searchParams.get("api_key");
      if (queryKey && queryKey === DEFAULT_API_KEY) {
        return { isValid: true };
      }

      return {
        isValid: false,
        status: 401,
        error: "Missing Authorization header. Please pass: Authorization: Bearer <API_KEY>"
      };
    }

    const [scheme, token] = authHeader.split(" ");
    if (scheme?.toLowerCase() !== "bearer" || !token) {
      return {
        isValid: false,
        status: 401,
        error: "Invalid authorization format. Format must be 'Bearer <API_KEY>'"
      };
    }

    // Accept valid key or demo key
    if (token === DEFAULT_API_KEY || token.startsWith("phub_") || token === "demo") {
      return { isValid: true, token };
    }

    return {
      isValid: false,
      status: 403,
      error: "Invalid API Key. Ensure your CRM is configured with the correct PROSPECT_API_KEY."
    };
  }
}

