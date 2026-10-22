# 👛 Changelog

All the change, feature and detail update for this project is documented on this file.

## Unreleased

- Build and test against NestJS 12.2.0 while retaining NestJS 11 support.
- Use NodeNext module resolution for NestJS 12's ESM packages and verify both CommonJS and ESM consumers.
- Require Node.js 20.19+ or 22.12+ (excluding Node.js 21), and publish using Node.js 24.
- Initialize the Resend SDK when using `RESEND_API_KEY`, and report missing API keys correctly.
- Use NestJS factory injection types and the SDK's batch request options type.
- Keep the wrapper's `ResendOptions` export unambiguous with newer Resend SDK releases.
- Add integration tests and CI coverage for NestJS 11/12 on Node.js 22/24.
