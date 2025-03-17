# Monorepo - Turborepo

This Turborepo includes the following packages/apps:

## Apps and Packages

Apps:

- `defaultproject`: [Next.js](https://nextjs.org/) Default Copy Project for new Projects - Port 2000
- `project1`: [Next.js](https://nextjs.org/) Dummy Project - Playground - Port 3001
- `texted`: [Next.js](https://nextjs.org/) TextEd - Port ...
- `pubgen`: [Next.js](https://nextjs.org/) PubGen - Port ...
- `dqt`: [Next.js](https://nextjs.org/) DQT - Port ...
- `portview`: [Next.js](https://nextjs.org/) PortView - Port 3007
- `pmlis`: [Next.js](https://nextjs.org/) PM-LIS - Port 3006
- `pmmpeportal`: [Next.js](https://nextjs.org/) PM-MPE Portal - Port 3000

Packages:

- `@repo/ui`: Component library shared by all apps
- `@repo/global-functions`: Function library shared by all apps
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

### Requirements

- [Node.js](https://nodejs.org/en/) (v22.13.0) -> see .nvmrc file

### Develop

To develop all apps and packages, run the following command:

```bash
npm run dev
```

### Build

To build all apps and packages, run the following command:

```bash
npm run build
```

### Develop a Specific App

To develop a specific app, run the following command:

```bash
cd apps/project1
npm run dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```bash
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```bash
npx turbo link
```

## RVW & PRD

rvw: <https://bosch-hc-pm-mpe-portal-frontend.kittelberger.net/>  
prd: <https://pm-mpe-portal.bosch-homecomfort.com/>

## How to add a new Project

- Copy apps/defaultproject to apps/newprojectname
- Update the package.json with the new project name
- Update the dev task in the package.json to a new available port
- Update the client in die ApolloProviderWrapper.tsx file
- Customize your middleware Routes in middleware.ts
- Customize your remote Pattern in next.config.js

## How to add a new UI Component

- Go to packages/ui and create a new component Folder under src (atoms, molecules, organisms)
- Go to packages/ui/index.tsx and add the new component to the export
- Now you can import the new component in your project under apps via -> import { newComponent } from "@repo/ui";

## How to add a new global Function

- Go to packages/global-functions and create a new function file
- Go to package.json and add the new function to the exports
- Now you can import the new function in your project under apps via -> import { newFunction } from "@repo/global-functions";

## How to add a new global Icon

- Go to packages/ui/assets/icons
- Create a new .tsx file and add the svg code
- Go to packages/ui/index.tsx and add the new icon to the export

## How to add a new Node Package

- Decide if the package should be installed for all apps or only for a specific app
- If the package should be installed for all apps, add it to the root package.json
- If the package should be installed for a specific app, add it to the package.json of the app

## Labels

- ToDo

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

## Styling for Components (SCSS)

Please stick to the styling spelling in the project

BEM https://getbem.com/introduction/

- Block (z.b. Card)
- Element (z.b. Card_hdl)
- Modifier (z.b. Card_hdl-primary)

## Colors

- primary: var(--bosch-white)
- secondary: var(--bosch-gray-95)
- contrast: var(--bosch-gray-20)

Turbo Remote Caching (KIT)
npx turbo run build --cache=remote:rw --token="changeme" --team="TOB"
