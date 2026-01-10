# dayonebros

v1.1.1


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Preview the production build
```
npm run preview
```

### Lints and fixes files
```
npm run lint
```

### SSR hosting (free)
Recommended target: Cloudflare Pages + Functions.

High-level steps:
- Connect this repo to Cloudflare Pages.
- Build command: `npm run build`
- Output directory: `.output/public`
- Add environment variables for `NUXT_PUBLIC_YOUTUBE_API_KEY` and `NUXT_PUBLIC_YOUTUBE_ENDPOINT` if you move them out of `nuxt.config.ts`.

### Customize configuration
See [Nuxt Configuration Reference](https://nuxt.com/docs/guide/directory-structure/nuxt-config).
