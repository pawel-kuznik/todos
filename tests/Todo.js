/**
 *  This file is a test file for a Todo class.
 *
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

// the class
var Todo = require('./../src/Todo.js');

// get expect
var expect = require('chai').expect;

describe('Todo', function () {

    describe('#constructor()', function () {

        it('Should not construct without an object', function () {

            // the function that would construct a new todo
            let construction = function () { return new Todo(); };

            // it's expected to get an exception when constructing without data
            expect(construction).to.throw(Error);
        });

        it('Should construct with empty data', function () {

            // the function that will make the construction
            let construction = function () {

                // construct
                let todo = new Todo({ });

                // return todo
                return todo;
            };

            // it's expected to be ok if we have an empty object as data
            expect(construction).to.not.throw(Error);

            // construct the todo
            let todo = construction();

            // public properties should be set
            expect(todo).to.have.property('title').that.is.a('string');
            expect(todo).to.have.property('state').that.is.a('string');
            expect(todo).to.have.property('id').that.is.a('string');
        });
    });

    describe('#id', function () {

        it('Should not change when title changes', function () {

            // create a todo
            let todo = new Todo({
                title: 'Test one'
            });

            // store id
            var id = todo.id;

            // set new title
            todo.title = 'New title';

            // check if the id changed
            expect(todo.id).to.equal(id);

            // and todo created from a serialized form should have same id
            let todo2 = new Todo(todo.serialize());

            // check if the id changed
            expect(todo2.id).to.equal(id);
        });
    });

    describe('#check()', function () {

        it('Should change to done state when checked out', function () {

            // create a todo
            let todo = new Todo({
                title: 'Test one'
            });

            // check out the todo
            todo.check();

            // check if done state
            expect(todo.state).to.equal('done');
        });
    });

    describe('#serialize()', function () {

        it('should serialize default data', function () {

            // create the todo that we want to test
            let todo = new Todo({
                title: 'Test one'
            });

            // serialize todo
            let serialized = todo.serialize();

            // expect an serialized object
            expect(serialized).to.be.an('object');
            expect(serialized).to.have.property('title').that.is.a('string').and.equals('Test one');
            expect(serialized).to.have.property('id').that.is.a('string').and.equals('c93b88aa');
            expect(serialized).to.have.property('state').that.is.a('string').and.equals('active');
        });
    });
});
