# Tygr Auth

_Part of the [@tygr component library](https://tygr.info/@tygr)_

[Demo](https://tylergrinn.github.io/tygr-auth)

[Forking Guide](https://github.com/tylergrinn/tygr-auth/blob/main/docs/forking.md)

This is a react component packaged for three environments: node, browser, and standalone.

- Node is reccommended. If you are already using react in the project, this library simply exports a react component function you can use directly in jsx.

- Browser is for fast prototyping in the browser. You can add this component via a script tag. The react and react-dom script tags must be placed before the component script.

- Standalone is for projects that do not use react. It exposes the `mount` function, which takes an HTML element.

## [Sister module: auth express middleware](https://github.com/tylergrinn/tygr-auth-server.git)

## Authentication base url

In order to set the authentication server base url, add a global variable before loading the component script:

```html
<script>
  var AUTH_API_BASE_URL = 'https://localhost:8080/auth';
</script>
```

## Node

Installation:

```cmd
npm i --save @tygr/auth
```

Usage (jsx):

```jsx
import Auth, { AuthContext, useAuthStore } from '@tygr/auth';

// Import styles. Make sure there is a style loader specified in your
// webpack config
import '@tygr/auth/lib/tygr-auth.min.css';

export default function MyComponent() {
  const authStore = useAuthStore();

  return (
    <AuthContext.Provider value={authStore}>
      <div>
        <h1>Auth usage example</h1>
        <Auth
          // Choose which providers to include
          google
          github
          // Add a custom header to the login screen
          Header={HeaderComponent}
          /**
           * Add a custom account page.
           * You may use the `import { AuthContext } from '@tygr/auth'
           * context in this component to dispatch account actions and
           * get the state and user object.
           */
          Account={AccountComponent}
        />
      </div>
    </AuthContext.Provider>
  );
}
```

## Browser

Usage:

When included via script tag, the component, context, and store hook are exposed in a window library named 'TygrAuth'

```html
<html>
  <head>
    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <script src="https://tylergrinn.github.io/tygr-auth/lib/tygr-auth.min.js"></script>
    <link
      rel="stylesheet"
      href="https://tylergrinn.github.io/tygr-auth/lib/tygr-auth.min.css"
    />
  </head>
  <body>
    <div id="app"></div>

    <script type="text/babel">
      function App() {
        const store = TygrAuth.useAuthStore();
        return (
          <TygrAuth.Context.Provider value={store}>
            <TygrAuth.Component google github />
          </TygrAuth.Context.Provider>
        );
      }

      ReactDOM.render(<App />, document.getElementById('app'));
    </script>
  </body>
</html>
```

## Standalone

Installation:

```cmd
npm i --save @tygr/auth
```

Usage:

```jsx

// Vanilla JS
import Auth from '@tygr/auth/lib/standalone';

const el = document.getElementById('tygr-auth');

Auth.mount(el);

// Vue
<template>
<div>
  <div ref="tygr-auth"></div>
</div>
</template>

<script>
import Auth from '@tygr/auth/lib/standalone';

export default {
  mounted() {
    Auth.mount(this.$refs['tygr-auth'], {
      google: true,
      github: true,
    });
  },
};
</script>

// Angular Typescript
import { Component, ElementRef, ViewChild } from '@angular/core';
import Auth from '@tygr/auth/lib/standalone';

@Component({
  selector: 'app-root',
  template: '<div><div #tygr-auth></div></div>',
})
export class AuthComponent  {
  @ViewChild('tygr-auth') el: ElementRef;

  ngAfterViewInit() {
    Auth.mount(this.el.nativeElement, {
      google: true,
      github: true
    });
  }
}
```

You should not use the standalone version if you have multiple react components in your project.

## Customizing styles

Sass variables can be overridden if you accept responsibility for transpiling it into css. You can see an example of this setup in the `demo/webpack.config.js` configuration named `sass`.

Make sure to reassign any sass variables before importing the `sass` library:

```scss
$accent-1: white;
$accent-2: yellow;

@import '@tygr/auth/sass';
```
