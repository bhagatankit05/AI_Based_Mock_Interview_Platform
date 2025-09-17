import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/next";

export const aj = arcjet({
  key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  rules: [
    // Create a token bucket rate limit. Other algorithms are supported.
    tokenBucket({
      mode: "LIVE",
      // Tracked by IP address by default, but this can be customized
      // See https://docs.arcjet.com/fingerprints
      characteristics: ["userId"],
      refillRate: 5, // Refill 5 tokens per interval
      interval: 86400, // Refill every 24 hrs
      capacity: 10, // Bucket capacity of 10 tokens
    }),
  ],
});