/**
 *  This is a class that would describe one todo.
 *
 *  The todo
 *
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

var crc = require('crc');

// the class
var Todo = class {

    /**
     *  A constructor.
     *
     *  @param  object
     */
    constructor(data) {

        // no data? don't construct todo
        if (!data) throw Error('No data');

        // assign data
        this.title = data.title || '';
        this.state = data.state || 'active';
        this.id = data.id || crc.crc32(this.title).toString(16);
        this.description = data.description || '';
    }

    /**
     *  Check out the todo.
     */
    check() {

        // set the state to done
        this.state = 'done';

        // allow chaining
        return this;
    }

    /**
     *  Serialize todo into a data object.
     *
     *  @return object
     */
    serialize() {
        return {
            title: this.title,
            state: this.state,
            description: this.description,
            id: this.id
        }
    }
}

// export the Todo
module.exports = Todo;
