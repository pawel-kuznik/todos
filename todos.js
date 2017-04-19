#!/usr/bin/env node

// dependecies
var program = require('commander');
var fs = require('fs');
var cliff = require('cliff');
var Todos = require('./src/Todos');
var os = require('os');
var child_process = require('child_process');
var tty = require('tty');

// determine where we want to store the todos
var filePath = os.homedir() + '/.todos.json';

// path for the temporary file
var tmpPath = os.homedir() + '/.todos-tmp';

// read data from the data.json
var data = (function () {

    // no data file?
    if (!fs.existsSync(filePath)) {

        // create the empty data file (so it's there for the next time and we know that todos were initialized)
        fs.writeFileSync(filePath, JSON.stringify({ }), { encoding: 'utf8' });

        // return empty data
        return new Todos({ });
    }

    // read the whole file
    var data = fs.readFileSync(filePath, 'utf8');

    // return parsed data
    return new Todos(JSON.parse(data));
})();

// start setting up the program
program
    .version('0.1.0');

// add the list command
program
    .command('list')
    .alias('ls')
    .description('List all current todos.')
    .option('-I, --id', 'Display IDs of todos')
    .option('-i, --idx', 'Display index of todos')
    .action(function(cmd, options) {

        // do we have todos?
        if (data.empty()) {

            // tell the user that there are no todos yet
            console.log('No todos');

            // we are done here
            return;
        }

        // the fields to include
        let fields = [];

        // should we add an idx or an id to the output?
        if (cmd.idx) fields.push('idx');
        if (cmd.id) fields.push('id');

        // push state and title
        fields.push('state');
        fields.push('title');

        // display the data
        console.log(cliff.stringifyObjectRows(data.dataList(), fields));
    });

// add the add sub command
program
    .command('add <title>')
    .alias('create')
    .description('Create a new todo.')
    .action(function (title) {

        // push new todo to data
        data.create(title);

        // write the new todo to the data file
        fs.writeFileSync(filePath, JSON.stringify(data.serialize()), { encoding: 'utf8' });
    });

// add the check command
program
    .command('check <id>')
    .description('Check one of the todos as completed.')
    .action(function (id) {

        // check the todo
        data.at(id).check();

        // write the new todo to the data file
        fs.writeFileSync(filePath, JSON.stringify(data.serialize()), { encoding: 'utf8' });
    });

// add the command to clear finished
program
    .command('clear')
    .alias('empty')
    .description('Clear all done todos.')
    .action(function () {

        // limit data
        data = data.filter(function (todo) {

            // notd one? can stay
            return todo.state != 'done';
        });

        // write the new todo to the data file
        fs.writeFileSync(filePath, JSON.stringify(data.serialize()), { encoding: 'utf8' });
    });

// add the edit commaind
program
    .command('edit <id>')
    .description('Edit todo')
    .action(function(id) {

        // get the todo
        let todo = data.at(id);

        // no todo? don't edit
        if (!todo) {

            // tell user that todo does not exists
            console.log("Todo " + id + " does not exists.");

            // we are good
            return;
        }

        // write description to a file
        fs.writeFileSync(tmpPath, todo.description, { encoding: 'utf8' });

        // spawn instance of an editor
        let editor = child_process.spawn('editor', [ tmpPath ]);

        // allow for input
        process.stdin.resume();

        // handlers for input and outputs
        let inputHandler = function (data) { editor.stdin.write(data); };
        let outputHandler = function (data) { process.stdout.write(data); };

        // make a passthrough for input and output
        process.stdin.on('data', inputHandler);
        editor.stdout.on('data', outputHandler);

        // we want to work in raw mode
        process.stdin.setRawMode(true);

        // when editor exits we want to resume normal operation
        editor.on('exit', function () {

            // unbind the event listeners
            process.stdin.removeListener('data', inputHandler);
            editor.stdout.removeListener('data', outputHandler);

            // let us return to normal mode
            process.stdin.setRawMode(false);

            // do not await input
            process.stdin.pause();

            // read changes from file
            todo.description = fs.readFileSync(tmpPath, 'utf8');

            // write the new todo to the data file
            fs.writeFileSync(filePath, JSON.stringify(data.serialize()), { encoding: 'utf8' });
        });
    });

// add the show commaind
program
    .command('show <id>')
    .description('Show a todo')
    .action(function (id) {

        // get the todo
        let todo = data.at(id);

        // no todo? don't edit
        if (!todo) {

            // tell user that todo does not exists
            console.log("Todo " + id + " does not exists.");

            // we are good
            return;
        }

        // show the title
        console.log(todo.title);

        //  separator
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

        // show the description for the todo
        console.log(todo.description);
    });

// parse the program
program.parse(process.argv);

// display the help if nothing to parse
if (!process.argv.slice(2).length) program.outputHelp();
