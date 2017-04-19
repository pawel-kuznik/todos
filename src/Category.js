/**
 *  This is a class that would describe a category of todos.
 *
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

// dependencies
var Todos = require('./Todos');

// the class
var Category = class {

    /**
     *  Constructor
     *
     *  @param  data
     */
    constructor(data) {

        // no data? throw
        if (!data) throw Error('No data');

        // no name in data? throw
        if (!data.name) throw Error('No name');

        // store the name
        this.name = data.name;

        // instantiate todos
        this.todos = new Todos(data.todos ? data.todos : { });
    }

    /**
     *  Serialize
     *
     *  @return object
     */
    serialize () {

        // serialize Category into object
        return {
            name: this.name,
            todos: this.todos.serialize()
        };
    }
}

// export the category class
module.exports = Category;
