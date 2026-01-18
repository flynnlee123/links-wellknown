# .well-known link files (Vercel)

Tiny Vercel project for hosting the `/.well-known/*` files needed for:

- **Android App Links** (`assetlinks.json`)
- **iOS Universal Links** (`apple-app-site-association`)

It also includes a `middleware.ts` matcher snippet you can copy into a Next.js app to ensure middleware does **not** intercept `/.well-known/*` routes.

## What’s in here

- `public/.well-known/assetlinks.json` — Android association (package name + signing cert SHA-256 fingerprints)
- `public/.well-known/apple-app-site-association` — iOS association (Team ID + Bundle ID)
- `vercel.json` — forces correct `Content-Type` headers for both endpoints
- `middleware.ts` — excludes `/.well-known` from the middleware matcher

## Deploy

This repo contains only static files + Vercel config. Common options:

### Option A: Vercel static output
Deploy to Vercel and set the **Output Directory** to `public` (so `public/.well-known/*` is served from `/.well-known/*`).

- Build command: none

After deploy, these URLs should resolve:

- `https://<your-domain>/.well-known/assetlinks.json`
- `https://<your-domain>/.well-known/apple-app-site-association`

### Option B: Include in a Next.js app
Copy `public/.well-known/*` into your Next.js app’s `public/.well-known/` folder, and merge `vercel.json` headers as needed.

## Verify

Check that the files are reachable and the content types are correct:

```sh
curl -i https://<your-domain>/.well-known/assetlinks.json
curl -i https://<your-domain>/.well-known/apple-app-site-association
```

You should see:

- `Content-Type: application/json` for `assetlinks.json`
- `Content-Type: application/json` for `apple-app-site-association` (this commonly breaks when served as `text/plain`)
Also ensure `/.well-known/apple-app-site-association` returns `200` with no redirects.

## Update app identifiers

### Android
Edit `public/.well-known/assetlinks.json`:

- `target.package_name` — your Android applicationId / package name
- `target.sha256_cert_fingerprints` — SHA-256 of the signing cert(s) used to sign the app

### iOS
Edit `public/.well-known/apple-app-site-association`:

- `details[].appID` — `<TEAM_ID>.<BUNDLE_ID>`
- `details[].paths` — the URL paths your app should handle (use `"*"` for all)

## Next.js middleware note

If your main site is a Next.js app using middleware, ensure `/.well-known/*` is excluded from the matcher (see `middleware.ts`), otherwise requests for these files can get redirected/rewritten and app-link verification may fail.
