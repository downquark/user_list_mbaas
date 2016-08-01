/* global require module */
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var Promise = require('bluebird');
var db = Promise.promisify(require('fh-mbaas-api').db);
//var log = require('fh-bunyan');
var collection = 'users';

var users = module.exports = new express.Router();
users.use(cors());
users.use(bodyParser());//.json());

users.post('/', function(req, res, next) {
    console.log(new Date(), 'In users route POST / req.body=', req.body);
    db({
        act: 'create',
        type: collection,
        fields: req.body
    }).then(function (data) {
        res.json(data);
    }).catch(next);
});

users.put('/:guid', function(req, res, next) {
    console.log(new Date(), 'In users route PUT / req.body=', req.body);
    db({
        act: 'update',
        type: collection,
        guid: req.params.guid,
        fields: req.body
    }).then(function (data) {
        res.json(data);
    }).catch(next);
});

users.get('/', function(req, res, next) {
    console.log(new Date(), 'In users route GET / query=', req.query);
    var options = {
        act: 'list',
        type: collection
    };
    if (req.query) {
        options.eq = req.query;
    }
    db(options).then(function (data) {
        res.json(data);
    }).catch(next);
});

users.get('/:guid', function(req, res, next) {
    console.log(new Date(), 'In users route GET / guid=', req.params.guid);
    db({
        act:'read',
        type: collection,
        guid: req.params.guid
    }).then(function (data) {
        res.json(data);
    }).catch(next);
});

users.delete('/:guid', function(req, res, next) {
    console.log(new Date(), 'In users route DELETE / req.body=', req.body);
    db({
        act: 'delete',
        type: collection,
        guid: req.params.guid
    }).then(function (data) {
        res.json(data);
    }).catch(next);
});
