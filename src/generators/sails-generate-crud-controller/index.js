const util = require('util');
const path = require('path');
const _ = require('lodash');
require('colors');

/**
 * @description Generates CRUD controller for the given schema name.
 * @docs https://sailsjs.com/docs/concepts/extending-sails/generators/custom-generators
 * 
 * Usage:
 * This handler should be added to your .sailsrc file for registering
 * a custom sails generator. 
 * The shell command to be executed will be:
 * `sails generate <generator-name> <schema-name> --type <type>`,
 * where:
 *   a) `generator-name` is a name used for generator in .sailsrc file
 *   b) `schema-name` is a name of schema used in controller
 *   c) `type` is set to `sql` or `mongo`
 */
module.exports = {
  /**
   * `before()` is run before executing any of the `targets`
   * defined below.
   *
   * This is where we can validate user input, configure default
   * scope variables, get extra dependencies, and so on.
   *
   * @param  {Dictionary} scope
   * @param  {Function} done
   */
  before(scope, done) {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // // scope.args are the raw command line arguments.
    // //
    // // e.g. if someone runs:
    // // $ sails generate crud-controller user find create update
    // // then `scope.args` would be `['user', 'find', 'create', 'update']`
    if (_.isUndefined(scope.args[0])) {
      return done('Please provide a name for this controller.'.yellow);
    }

    if (_.isUndefined(scope.type)) {
      return done('Please provide a type for this controller.'.yellow);
    }

    if (['mongo', 'sql'].indexOf(scope.type) === -1) {
      return done('The provided type for this controller is not supported. please provide --type mongo or sql'.yellow);
    }

    if (!_.isString(scope.args[0])) {
      return done(
        new Error(`Expected a string for \`scope.args[0]\`,
       but instead got: ${util.inspect(scope.args[0], { depth: null })}`)
      );
    }
    //
    // Provide defaults for the scope.
    scope = _.defaults(scope, {
      createdAt: new Date(),
    });
    // Decide the output filename for use in targets below:
    scope.entityName = _.startCase(scope.args[0]).replace(/ /g, '');
    scope.filename = `${scope.entityName}Controller.js`;

    scope.entity = _.snakeCase(scope.args[0]);

    console.log('Generating a new controller of type %s for entity %s  as ', scope.type, scope.entity);
    console.log(`${scope.type}.template`);
    this.targets['./api/controllers/:filename'].template = `${scope.type}.template`;
    this.targets['./test/api/:entityName/api.test.js'].template = `test.template`;

    //scope.field = 'field';
    //scope.sails = 'sails';
    // // Add other stuff to the scope for use in our templates:
    // scope.whatIsThis = 'an example file created at '+scope.createdAt;
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // When finished, trigger the `done` callback to begin generating
    // files/folders as specified by the `targets` below.
    //
    // > Or call `done()` with an Error for first argument to signify a fatal error
    // > and halt generation of all targets.
    return done();
  },

  /**
   * The files/folders to generate.
   * @type {Dictionary}
   */
  targets: {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // • e.g. create a folder:
    // ```
    // './hey_look_a_folder': { folder: {} }
    // ```
    //
    // • e.g. create a dynamically-named file relative to `scope.rootPath`
    // (defined by the `filename` scope variable).
    //
    // The `template` helper reads the specified template, making the
    // entire scope available to it (uses underscore/JST/ejs syntax).
    // Then the file is copied into the specified destination (on the left).
    // ```
    './api/controllers/:filename': {
      template: 'type.template.js',
    },
    './test/api/:entityName': {
      folder: {}
    },
    './test/api/:entityName/api.test.js': {},
    // ```
    //
    // • See https://sailsjs.com/docs/concepts/extending-sails/generators for more documentation.
    // (Or visit https://sailsjs.com/support and talk to a maintainer of a core or community generator.)
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  },

  /**
   * The absolute path to the `templates` for this generator
   * (for use with the `template` and `copy` builtins)
   *
   * @type {String}
   */
  templatesDirectory: path.resolve(__dirname, './templates'),
};
