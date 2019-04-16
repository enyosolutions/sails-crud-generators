# sails-crud-generators

A set of custom generators for use with the Sails command-line interface.

## Installation

```sh
$ npm install sails-crud-generators --save
```

Then merge the following into your `.sailsrc` file:

```json
{
  "generators": {
    "modules": {
      "db:sync": "node_modules/sails-crud-generators/src/generators/sails-generate-sequelize-sync",
      "schema": "node_modules/sails-crud-generators/src/generators/sails-generate-schema",
      "controller": "node_modules/sails-crud-generators/src/generators/sails-generate-crud-controller",
      "route": "node_modules/sails-crud-generators/src/generators/sails-generate-route",
      "api": "node_modules/sails-crud-generators/src/generators/sails-generate-api"
    }
  }
}
```

> Certain generators are installed by default in Sails, but they can be overridden. Other generators add support for generating entirely new kinds of things.
> Check out [Concepts > Extending Sails > Generators](https://sailsjs.com/docs/concepts/extending-sails/generators) for information on installing generator overrides / custom generators and information on building your own generators.

## Usage

```bash
$ sails generate db:sync
$ sails generate schema <schema-name> --types json,sql --fields field1,field2,field3,..
$ sails generate controller <schema-name> --type sql|mongo
$ sails generate route <schema-name>
$ sails generate api <schema-name> --type json|sql|mongo --fields field1,field2,field3,..
```

## Need help?

See [Extending Sails > Generators > Custom Generators](https://sailsjs.com/docs/concepts/extending-sails/generators/custom-generators) in the [Sails documentation](https://sailsjs.com/documentation), or check out [recommended support options](https://sailsjs.com/support).

<a href="https://sailsjs.com" target="_blank" title="Node.js framework for building realtime APIs."><img src="https://github-camo.global.ssl.fastly.net/9e49073459ed4e0e2687b80eaf515d87b0da4a6b/687474703a2f2f62616c64657264617368792e6769746875622e696f2f7361696c732f696d616765732f6c6f676f2e706e67" width=60 alt="Sails.js logo (small)"/></a>

## Contributing

Please observe the guidelines and conventions laid out in the [Sails project contribution guide](https://sailsjs.com/documentation/contributing) when opening issues or submitting pull requests.


## License

This sequelize:sync generator is available under the **MIT license**.

The [Sails framework](https://sailsjs.com) is free and open-source under the [MIT License](https://sailsjs.com/license).

![image_squidhome@2x.png](http://i.imgur.com/RIvu9.png)
