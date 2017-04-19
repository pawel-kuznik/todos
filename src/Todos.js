/**
 *  This is a class that would create todos list from a data object.
 *
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

var crc = require('crc');
var Todo = require('./Todo');

// the class
var Todos = class {

    /**
     *  The constructor. We are expecting to get the data object as the parameter.
     *
     *  @param  object
     */
    constructor (data) {

        // the data array
        this.data = [];

        // should we parse the todos data?
        if (data && data.todos) data.todos.map(function (item) {
            return new Todo(item);
        }).forEach((item) => { this.data.push(item); });
    }

    /**
     *  Create the new todo in the list.
     *
     *  @return Todo
     */
    create(title) {

        // no title? no todo
        if (!title) throw Error('No data');

        // create new todo
        let todo = new Todo({
            title: title
        });

        // push created todo on the data table
        this.data.push(todo);

        // return created todo
        return todo;
    }

    /**
     *  Get a todo at given position or with given ID.
     *
     *  @param  string|int
     *  @return Todo|null
     */
    at(id) {

        // get the idx of the todo
        let idx = typeof id == 'number' ? id : this.data.findIndex(function (item) { return item.id == id });

        // no todo? return null
        if (idx == -1) return null;

        // return the Todo
        return this.data[idx];
    }

    /**
     *  Do we have todos to work with?
     *
     *  @return boolean
     */
    empty() {

        // no todos?
        return this.data.length === 0;
    }

    /**
     *  Return a list of data of todos.
     *
     *  @return Array
     */
    dataList() {

        // get serialized data
        let serialized = this.serialize();

        // return the data object
        return serialized.todos.map(function (item) {

            // get index of the todo
            item.idx = serialized.todos.indexOf(item);

            // return updated item
            return item;
        });
    }

    /**
     *  Limit the collection of todos to a one that match certain callback.
     *
     *  @param  function
     *  @return Todos
     */
    filter(callback) {

        // return limited collection
        return new Todos( { todos: this._data.todos.filter(callback) } );
    }

    /**
     *  Serialize the todos into a data object that can be stored somewhere
     *  and the loaded again.
     *
     *  @return object
     */
    serialize() {

        // return the data
        return {
            todos: this.data.map(function (item) { return item.serialize(); })
        };
    }
};

// export the class
module.exports = Todos;
