/**
 *  This is  a file that will test a todo category.
 *
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

var Category = require('./../src/Category');
var Todos = require('./../src/Todos');
var Todo = require('./../src/Todo');

// get expect
var expect = require('chai').expect;

describe("Category", function () {

    describe('#constructor', function () {

        it('Should throw when no name was supplied', function () {

            // the construction function
            let construction = function () { new Category(); }

            // expect construction to throw when no name for category
            expect(construction).to.throw(Error);
        });

        it('Should create with a name', function () {

            // create category
            let cat = new Category({ name: 'Todos' });

            // expect the name property
            expect(cat).to.have.property('name').that.equals('Todos');
        });
    });

    describe('#serialize', function () {

        it('Should output data', function () {

            // create category
            let cat = new Category({ name: 'Todos' });

            // serialize category
            let serialized = cat.serialize();

            // check if we have needed properties
            expect(serialized).to.have.property('name').that.equals('Todos');
            expect(serialized).to.have.property('todos').that.is.an('object');
        });
    });
});
