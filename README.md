# Pluto

Welcome to the free Pluto Policy Manager - your app to manage Chrome OS policies.
This tool is being developed and maintained by the Pluto open source team

## Installation

Use the package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install all of Pluto's build dependencies. 

```bash
npm install
```

## Customization

Make a copy of `.env.example` into `.env` and customize it to your needs. 

```bash
cp .env.example .env
```

## Build

Generate a minified build ready to host on any web server using

```bash
npm run build
```

## Deploy

After building, you can copy the files in `dist/` onto any web server. 

A very easy way to host Pluto is to use [Google App Engine](https://cloud.google.com/appengine). There's a configuration file for App Engine included in this repository, the `app.yaml`. To deploy Pluto to AppEngine, use 

```bash
gcloud app deploy
```

Alternatively, you could upload it to any web accessible storage (like [Google Cloud Storage](https://cloud.google.com/storage)) and [point your domain to it](https://cloud.google.com/storage/docs/hosting-static-website). 
