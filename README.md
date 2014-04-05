env-builder-cli
===============

CLI for env-builder

Installation
------------

```sh
npm install -g env-builer-cli
```

Usage
-----

```sh
$ env-builder --help

  Usage: env-builder <source> [options]

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -e, --env <env>      name of the env
    -t, --types <types>  comma-separated list of types associated with the app
    -a, --app <app>      name of the app
    -o, --out [out]      write the env to a file (defaut is .env)

  Examples:

    local path
      $ env-builder path/to/config -a my-app
      KEY=VALUE
      OTHER=FOO
      MY_APP_URL=http://myapp.example.com

    pipe to stdout
      $ env-builder path/to/config > .env

    write to .env file
      $ env-builder path/to/config -o

    github repo
      $ GITHUB_TOKEN=my-oauth-token env-builder org/repo
```

Concepts
--------

Config values are built using inheritance, with last write wins. Say we were setting up `my-app` locally. It would construct the following inheritance chain:

```
default (globals - all apps are affected)
local (local globals)
my-app default (defaults across different environments)
my-app local (local specific values)
```

Apps can also be grouped into types for easy classification. Consider the previous example with added `ui` and `customer-facing` types:

```
default
local
ui default (defaults across all ui apps)
ui local (defaults across all ui local deployments)
customer-facing default (defaults across all customer-facing apps)
customer-facing local (defaults across all customer-facing local deployments)
my-app default
my-app local
```

The directory structure for the config files might look something like this:

```sh
.
├── default
│   ├── default
│   ├── test
│   └── local
├── types
│   ├── ui
│   │   ├── default
│   │   ├── test
│   │   └── local
│   └── customer-facing
│       ├── default
│       ├── test
│       └── local
└── apps
    ├── my-app
    │   ├── default
    │   ├── test
    │   └── local
    └── my-other-app
        ├── default
        ├── test
        └── local
```
