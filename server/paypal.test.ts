import { describe, expect, it } from "vitest";
import { getPayPalAccessToken } from "./paypal";

describe("PayPal Integration", () => {
  it("should successfully authenticate with PayPal API using provided credentials", async () => {
    // This test validates that the PayPal credentials are correct
    // by attempting to get an access token
    const accessToken = await getPayPalAccessToken();

    expect(accessToken).toBeDefined();
    expect(typeof accessToken).toBe("string");
    expect(accessToken.length).toBeGreaterThan(0);
  }, 10000); // 10 second timeout for API call
});
