# Pluto Policy Manager

## Try it out

Check out our [Pluto Demo Application](https://pluto.chromebook.cloud/)!

## Features

Compared to Google's own admin console, Pluto aims to make the admin's life easier in the following ways:

- Copy policies between organizational units
- Backup and version policies
- Diff policy changes before effecting them
- White label this app for enterprise use
- QoL features like dark mode and mobile support

## Quickstart for devs

To skip the setup steps for a dev setup, you can also try out Pluto in Gitpod, a one-click online IDE:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/Pluto-Open-Source-Team/Pluto-Policy-Manager)

## Installation

Use the package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install all of Pluto's build dependencies.

```bash
npm install
```

## Developing

To start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

There are also tests available. It's very much recommended to run unit tests

```bash
npm run test:unit
```

They'll start in watch mode, so you can leave them open while developing and check whether you've broken anything at any time.

Before committing (or opening a pull request), also run our end-to-end tests using `npm run test`.

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

### Environment variables

We use `.env` files to configure the app at compile time, both when running a dev server as well as when building. Copy the `.env.example` into `.env` to get started.

- **`PUBLIC_CLIENT_ID`** is the Google OAuth2 client id we need to make any API requests. There's a default provided, but every project and id has their own quotas. So if you ever run into quota errors, this may be an easy way to fix the issue: Simply create your own project and client id, as [documented by Google(https://support.google.com/cloud/answer/6158849)].

## Deploying

To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

We deploy to Google's AppEngine, which is why we use [`svelte-adapter-appengine`](https://github.com/HalfdanJ/svelte-adapter-appengine). This allows us to use Cloud Storage and some content caching.

To deploy to AppEngine, run `npm run build`, and then `gcloud app deploy --project <CLOUD_PROJECT_ID> build/app.yaml`.

If you just want a flat static site (ie HTML+CSS+JavaScript), you can instead use [SvelteKit's static site adapter](https://github.com/sveltejs/kit/tree/master/packages/adapter-static).

If you use other services (Cloudflare Pages, Netlify, Vercel), you can find [other adapters in SvelteKit's documentation](https://kit.svelte.dev/docs/adapters).
