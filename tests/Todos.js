/**
 *  This file is a test file for a Todos class.
 *
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

// the class
var Todos = require('./../src/Todos.js');
var Todo = require('./../src/Todo.js');

// get expect
var expect = require('chai').expect;

describe('Todos', function () {

    describe('#constructor()', function () {

        it('Should construct with empty data', function () {

            // a construction function
            let construction = function () {
                let todos = new Todos();
            };

            // expect the construction to not throw
            expect(construction).to.not.throw(Error);
        });

        it('Should construct with actual data', function () {

            // a construction function
            let construction = function () {
                return new Todos({ todos: [ { id: 'sample', title: 'sample' }]});
            };

            // expect to construct
            expect(construction).to.not.throw(Error);

            // construct the todos
            let todos = construction();

            // we should have one todo
            expect(todos).to.have.property('data').that.have.lengthOf(1);
        });
    });

    describe('#create()', function () {

        it('Should create a new todo', function () {

            // create new todos
            let todos = new Todos();

            // create a todo
            let todo = todos.create('Test one');

            // ensure that the todo is there
            expect(todos).to.have.property('data').that.have.lengthOf(1);
        });

        it('Should return newly created todo', function () {

            // create new todos
            let todos = new Todos();

            // create a todo
            let todo = todos.create('Test one');

            // expect that created todo is of an instance of Todo
            expect(todo).to.be.instanceOf(Todo);
        });
    });
});
