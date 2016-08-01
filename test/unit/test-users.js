/* global describe require it beforeEach */
'use strict';
var expect = require('chai').expect;
var sinon = require('sinon');
var supertest = require('supertest');
var proxyquire = require('proxyquire');

describe('users mbaas', function () {
    var dbStub, request;

    beforeEach(function () {
        dbStub = sinon.stub();

        var app = require('express')();
        var usersRouter = proxyquire('lib/routes/users', {
            'fh-mbaas-api': {
                db: dbStub
            }
        });
        app.use('/', usersRouter);
        request = supertest(app);
    });

    describe('GET /users' , function () {
        it('should return a list of users', function (done) {
            dbStub.yields(null, {
                count: 2,
                list: [{}, {}]
            });

            request.get('/')
            .expect(200)
            .end(function (err, res) {
                expect(err).to.not.exist;
                expect(res.body.list).to.have.length(2);
                done();
            });
        });

        it('should have one query parameter', function (done) {
            dbStub.yields(null, {
                count: 1,
                list: [{}, {}]
            });

            request.get('/?firstname=jane')
            .expect(200)
            .end(function (err, res) {
                expect(err).to.not.exist;
                expect(res.body.list).to.have.length(2);
                expect(dbStub.getCall(0).args[0].eq).to.deep.equal({
                    firstname: 'jane'
                });
                done();
            });
        });
    });

});
