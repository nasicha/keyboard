# Hana DS Prototype

This repository contains the files for the [Hana DS](https://hana-ds.netlify.app/) keyboard prototype. The keyboard uses the input of a gamepad to perform text input displayed on the site. A gamepad has to be connected with to test the prototype on the given website. 

## Technology

The prototype uses [Nuxt 3](https://nuxt.com/) and [Vue 3](https://vuejs.org/) as framework. It mainly uses VueUse's [useGamepad](https://vueuse.org/core/useGamepad/) to provide reactive bindings for the [Gamepad API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API) in the browser.

## Nuxt 3 Setup

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

### Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install
```

### Development Server

Start the development server on http://localhost:3000

```bash
yarn dev
```

### Production

Build the application for production:

```bash
yarn build
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
