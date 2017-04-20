/**
 *  This is a class that will help in getting and storing data.
 *
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 */


// dependencies
var os = require('os');
var fs = require('fs');
var Todos = require('./Todos');

// we use bluebird promises
var Promise = require('bluebird');

// the class
var DataProvider = class {

    /**
     *  The constructor.
     */
    constructor(path) {

        // assign the path
        this.dataFilePath = path || os.homedir() + './todos.json';
    }

    /**
     *  Get access to todos.
     *
     *  @return Promise
     */
    getTodos() {

        // return new promise
        return (new Promise((resolve, reject) => {

            // if file does not exists we want to reject the promise
            if (!fs.existsSync(this.dataFilePath)) {

                // reject the promise
                reject();

                // we are done here
                return;
            }

            // read the file
            fs.readFile(this.dataFilePath, (err, data) => {

                // if we have an error then we should reject the promise
                if (err) reject();

                // resolve the promise
                else resolve(new Todos(data));
            });
        }));
    }
};

// export the class
module.exports = DataProvider;
