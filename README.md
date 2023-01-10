# marchie.net

My portfolio website.

## Getting started

### Install dependencies

```
npm install
```

### Work locally
Watches for changes and serves locally on http://localhost:8080

```
npm run serve
```

### Create a production build

```
npm run build
```

## How To: Navigation

### Adding links to the navigation
Add the `eleventyNavigation` object to any page and it will appear in the navigation. Optionally set the order of your items.
Check the [11ty docs](https://www.11ty.dev/docs/plugins/navigation/) for more information about the navigation plugin.

```
---
eleventyNavigation:
  key: Your Page Name
  order: 1
---
```


## References

Derived from [tomreinert/minimal-11ty-tailwind-starter](https://github.com/tomreinert/minimal-11ty-tailwind-starter).
