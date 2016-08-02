/* global require module */
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var Promise = require('bluebird');
var db = Promise.promisify(require('fh-mbaas-api').db);
var log = require('fh-bunyan').getLogger(__filename);
var collection = 'users';

var users = module.exports = new express.Router();
users.use(cors());
users.use(bodyParser());//.json());

users.post('/', function(req, res, next) {
    log.info('In users route POST / req.body: %s', req.body);
    db({
        act: 'create',
        type: collection,
        fields: req.body
    }).then(function (data) {
        res.json(data);
    }).catch(next);
});

users.put('/:id', function(req, res, next) {
    log.info('In users route PUT / req.body: %s', req.body);
    db({
        act: 'update',
        type: collection,
        guid: req.params.id,
        fields: req.body
    }).then(function (data) {
        res.json(data);
    }).catch(next);
});

users.get('/', function(req, res, next) {
    log.info('In users route GET / query: %s', req.query);
    db({
        act: 'list',
        type: collection,
        eq: req.query
    }).then(function (data) {
        res.json(data);
    }).catch(next);
});

users.get('/:id', function(req, res, next) {
    log.info('In users route GET / id: %s', req.params.id);
    db({
        act:'read',
        type: collection,
        guid: req.params.id
    }).then(function (data) {
        res.json(data);
    }).catch(next);
});

users.delete('/:id', function(req, res, next) {
    log.info('In users route DELETE / id: %s', req.params.id);
    db({
        act: 'delete',
        type: collection,
        guid: req.params.id
    }).then(function (data) {
        res.json(data);
    }).catch(next);
});
