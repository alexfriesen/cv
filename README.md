# Cv

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Deployment

You start a deployment with one of 4 commands:
* `npm run deploy`: This will build the project and push the generated website to the gh-pages branch.
* `npm run deploy:patch`: This will create a Semver patch version, push the version bump and the git tag to master and run `npm run deploy`
* `npm run deploy:minor`: Same as above, only with a minor version
* `npm run deploy:major`: Same as above, only with a major version