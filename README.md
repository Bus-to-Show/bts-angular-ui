# BTS Admin Site

Production URL: https://bus-to-show.github.io/bts-angular-ui/

## Development

### Prerequisites

* Node v16.20
* npm v8.19

### Setup/run

1. Install the dependencies with `npm install`

2. Run the site with `npm start`

3. Ensure the API is listening on http://localhost:3000/ and browse to
   http://localhost:8080/bts-angular-ui/

4. Log in with the following credentials:

   * Email: admin@bustoshow.org
   * Password: Test123$

### Test

Run the unit tests with `npm test`.

### Build/serve/deploy

Create a production build with `npm run build`.

The resulting build directory can be served on localhost with `npx serve -p 8080 dist`.

The build directory can also be deployed to production, but this step is unnecessary as any
push/merge to the main branch will do so automatically via GitHub Actions.

### References

* [Deployment](https://v13.angular.io/guide/deployment)
* [Building and serving Angular apps](https://v13.angular.io/guide/build)
* [Angular workspace configuration](https://v13.angular.io/guide/workspace-config)
