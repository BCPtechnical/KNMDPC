## Quick Start

Download the template using git ssh. It should be able to run after a simple

```bash
yarn install
```

### Development

To start the project locally, run:

```bash
yarn start
```

Open `http://localhost:8000`.

## Documentation

### Requirements

- Node.js >= 18
- Yarn 3

### Directory Structure

- [`__tests__`](./__helpers__/) — Files for testing.<br>
- [`__mocks__`](./__mocks__/) — Mocks for testing.<br>
- [`src`](./src) — Application source code, including pages, components, styles.

### Scripts

- `yarn start` — Starts the application in development mode at `http://localhost:8000`.
- `yarn build` — Compile your application and make it ready for deployment.
- `yarn serve` — Serve the production build of your site
- `yarn clean` — Wipe out the cache (`.cache` folder).
- `yarn type-check` — Validate code using TypeScript compiler.
- `yarn lint` — Runs ESLint for all files in the `src` directory.
- `yarn format` — Runs Prettier for all files in the `src` directory.
- `yarn commit` — Run commitizen. Alternative to `git commit`.
- `yarn test` — Run tests.

### Path Mapping

TypeScript files are pre-configured with custom path mappings. To import components or files, use the `@` prefix.

```tsx
import { Button } from '@/components/Button';

// To import images or other files from the static folder
import avatar from '@/static/avatar.png';
```

### Tips

1. Use the provided default components to help structure your application. Use the provided Layout file and add adjustments to the global style there to propagate global css variables.

2. To use dotenv files, run the following commands below.

For development
  ```shell
  $ cp .env.example .env.development
  ``` 
For production
  ```shell
  $ cp .env.example .env.production
  ```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for more information.
