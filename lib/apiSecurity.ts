// API Security utilities
import { headers } from "next/headers";

/**
 * Validates that the request is coming from your own application
 * @returns true if request is valid, false otherwise
 */
export async function validateInternalRequest(): Promise<{
  isValid: boolean;
  error?: string;
}> {
  const headersList = await headers();

  const expectedToken = process.env.INTERNAL_API_SECRET;

  if (!expectedToken) {
    console.error("INTERNAL_API_SECRET environment variable is not configured");
    return {
      isValid: false,
      error: "Server configuration error",
    };
  }

  // Verify custom internal header
  const internalHeader = headersList.get("x-internal-request");

  if (internalHeader !== expectedToken) {
    return {
      isValid: false,
      error: "Unauthorized: Invalid internal request token",
    };
  }

  // Verify origin/referer
  const origin = headersList.get("origin");
  const referer = headersList.get("referer");
  const host = headersList.get("host");

  // In production, verify the request comes from your domain
  if (process.env.NODE_ENV === "production") {
    const allowedOrigins = [
      `https://${host}`,
      process.env.NEXT_PUBLIC_APP_URL,
    ].filter(Boolean);

    const isValidOrigin =
      (origin && allowedOrigins.some((allowed) => origin === allowed)) ||
      (referer &&
        allowedOrigins.some((allowed) =>
          referer.startsWith(allowed as string)
        ));

    if (!isValidOrigin) {
      return {
        isValid: false,
        error: "Unauthorized: Invalid origin",
      };
    }
  }

  return { isValid: true };
}
