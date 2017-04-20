/**
 *  Tests for DataProvider class.
 *
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

// the class
var DataProvider = require('./../src/DataProvider');

// the Todos class
var Todos = require('./../src/Todos');

// we use bluebird promises
var Promise = require('bluebird');

// setup chai
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('DataProvider', function () {

    // we will use a test path for testing this class
    var testPath = '/tmp/todos.json';

    describe('#getTodos()', function () {

        it('Should return a promise', function () {

            // create a data provider instance
            var provider = new DataProvider(testPath);

            // get todos
            var promise = provider.getTodos();

            // expect a promise
            expect(promise).to.be.an.instanceof(Promise);
        });

        it("It's promise should resolve with Todos", function () {

            // create a data provider instance
            var provider = new DataProvider(testPath);

            // get todos
            var promise = provider.getTodos();

            // expect promise to resolve in Todos
            expect(promise).to.be.fulfilled;
            expect(promise).to.eventually.be.an.instanceof(Todos);
        });
    });
});
