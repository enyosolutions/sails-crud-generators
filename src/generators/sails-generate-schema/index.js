const util = require('util');
const path = require('path');
const _ = require('lodash');
require('colors');

/**
 * @description Generates CRUD JSON/Sequelize schemas with ability to specify a list of fields to be added.
 * @docs https://sailsjs.com/docs/concepts/extending-sails/generators/custom-generators
 * 
 * Usage:
 * This handler should be added to your .sailsrc file for registering
 * a custom sails generator. 
 * The shell command to be executed will be:
 * `sails generate <generator-name> <schema-name> --types <types-list> --fields <fields-list>`,
 * where:
 *   a) `generator-name` is a name used for generator in .sailsrc file
 *   b) `schema-name` is a name of schema to be added
 *   c) `types-list` is a comma-separated list of schema types, possible values are `json` and `sql`
 *   d) `fields-list` is a comma-separated list of unique field names (should not contain `id`), 
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
    // 1. Check whether schema name was specified
    if (_.isUndefined(scope.args[0])) {
      return done('Please provide a name for this schema.'.yellow);
    }

    if (!_.isString(scope.args[0])) {
      return done(
        new Error(`Expected a string for \`scope.args[0]\`, but instead got:
          ${util.inspect(scope.args[0], { depth: null })}`)
      );
    }

    // 2. Check whether schema types param was specified
    if (_.isUndefined(scope.types)) {
      return done('Please provide at least one type for this schema (using --types)'.yellow);
    }
    scope.types = scope.types.split(',').map(e => e.trim());

    scope.types.forEach((elm) => {
      if (['json', 'sql'].indexOf(elm) === -1) {
        return done('The provided type for this schema is not supported. please provide --types json or sql '.yellow);
      }
    });

    // 3. Check whether at least one field was passed
    if (_.isUndefined(scope.fields)) {
      return done('Please provide at least one field for this schema (using --fields)'.yellow);
    }
    scope.fields = scope.fields.split(',').map(e => e.trim());

    // 4. Provide defaults for the scope.
    scope = _.defaults(scope, {
      createdAt: new Date(),
    });

    // 5. Decide the output filename for use in targets below:
    scope.filename = `${_.startCase(scope.args[0]).replace(/ /g, '')}.js`;
    scope.entity = _.snakeCase(scope.args[0]);

    scope.types.forEach((type) => {
      console.info('Generating a new schema of type %s for entity %s as ', type, scope.entity);
      console.info(`${type}.template`);
      const folder = type === 'json' ? 'schema' : 'sql';
      this.targets[`./api/models/${folder}/:filename`] = {};
      this.targets[`./api/models/${folder}/:filename`].template = `${type}.template`;
    });

    // 6. Check whether schema is generated for sql database
    scope.isSql = !!scope.types.find(type => type === 'sql');

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
