const _ = require('lodash');
const shell = require('shelljs');
require('colors');

/**
 * @description Automaticly generates schema, controller, route and unit tests for the given schema name.
 * @docs https://sailsjs.com/docs/concepts/extending-sails/generators/custom-generators
 * 
 * Usage:
 * This handler should be added to your .sailsrc file for registering
 * a custom sails generator. 
 * The shell command to be executed will be:
 * `sails generate <generator-name> <schema-name> --type <type>`,
 * where:
 *   a) `generator-name` is a name used for generator in .sailsrc file
 *   b) `schema-name` is a name of schema
 *   c) `type` is set to `json`, `mongo` or `sql`
 */
module.exports = {
  before(scope, done) {
    console.log('Generating a new api');

    const filename = scope.args[0];
    const type = scope.type;

    console.log('my args', filename, type);
    if (!filename || _.isUndefined(filename)) {
      return done('Please provide a name for this controller.'.yellow);
    }

    if (!type || _.isUndefined(type)) {
      console.log('missing type', type);
      return done('Please provide a type for this controller.'.yellow);
    }

    let subTypes;
    console.log('Generating model ');

    if (type === 'sql') {
      subTypes = 'json,sql';
    } else if (type === 'mongo' || type === 'json') {
      subTypes = 'json';
    } else {
      return done('Unsupported api type (%s). Please provide  "sql" or "mongo".'.yellow);
    }
    
    console.log('Generating model ', type, subTypes);
    shell.exec(`sails generate schema ${filename} --types ${subTypes}`);
    shell.exec(`sails generate controller ${filename} --type ${type}`);
    shell.exec(`sails generate route ${filename}`);
    return done();
  },

  /**
   * The files/folders to generate.
   * @type {Dictionary}
   */
  targets: {},

  /**
   * The absolute path to the `templates` for this generator
   * (for use with the `template` and `copy` builtins)
   *
   * @type {String}
   */
};
