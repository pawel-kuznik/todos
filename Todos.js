/**
 *  This is a class that would create todos list from a data object.
 *
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

var crc = require('crc');

// the class
var Todos = class {

    /**
     *  The constructor. We are expecting to get the data object as the parameter.
     *
     *  @param  object
     */
    constructor (data) {

        // remember data
        this._data = data;

        // ensure that we have an array with todos
        if (!data.todos) data.todos = [];
    }

    /**
     *  Create the new todo in the list.
     */
    create(title) {

        // push next todo
        this._data.todos.push({
            id: crc.crc32(title).toString(16),
            title: title,
            state: 'active'
        });
    }

    /**
     *  Check the todo with a given id as done
     */
    check(id) {

        // find the item to check
        var idx = this._data.todos.findIndex(function (item) {
            return item.id == id;
        });

        // no item to change? skip it
        if (idx === -1) return;

        // update data
        this._data.todos[idx].state = 'done';
    }

    forEach(callback) {

    }

    /**
     *  Do we have todos to work with?
     *
     *  @return boolean
     */
    empty() {

        // no todos?
        return this._data.todos === 0;
    }

    /**
     *  Return a list of data of todos.
     *
     *  @return Array
     */
    dataList() {

        // return the data object
        return this._data.todos;
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
        return this._data;
    }
};

// export the class
module.exports = Todos;
