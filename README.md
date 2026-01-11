# dayonebros

v2.0.0

Nuxt 3 + Vuetify app for DayOneBros.

## Project setup
```
npm install
```

### Run locally (dev server)
```
npm run dev
```

### Build for production
```
npm run build
```

### Preview the production build
```
npm run preview
```

### Lint
```
npm run lint
```

### Typecheck
```
npm run typecheck
```

## Environment variables
These are read from `runtimeConfig.public` in `nuxt.config.ts` and can be overridden:

- `NUXT_PUBLIC_YOUTUBE_API_KEY` (defaults to the key in `nuxt.config.ts`)
- `NUXT_PUBLIC_YOUTUBE_ENDPOINT` (defaults to `https://www.googleapis.com/youtube/v3/search`)

## SSR hosting (free)
Recommended target: Cloudflare Pages + Functions.

High-level steps:
- Connect this repo to Cloudflare Pages.
- Build command: `npm run build`
- Output directory: `.output/public`
- Add environment variables for `NUXT_PUBLIC_YOUTUBE_API_KEY` and `NUXT_PUBLIC_YOUTUBE_ENDPOINT` to override defaults.

## Customize configuration
See [Nuxt Configuration Reference](https://nuxt.com/docs/guide/directory-structure/nuxt-config).
