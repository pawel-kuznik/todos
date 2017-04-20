#!/usr/bin/env node

/**
 *  This is a file that will handle calls to `todos list`
 *
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

// dependencies
var program = require('commander');
var pkg = require('../package.json');

// add handling for the program.
program
    .version(pkg.version)
    .option('-I, --id', 'Display IDs of todos.')
    .option('-i, --idx', 'Display index of todos.')
    .parse(process.argv);

// display the help if nothing to parse
if (!process.argv.slice(2).length) program.outputHelp();
