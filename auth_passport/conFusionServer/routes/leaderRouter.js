const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//importing Model
const Leaders = require('../modals/leaders');
const Promotions = require('../modals/promotions');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json())

leaderRouter.route('/')
.get((req, res, next) => {
    Leaders.find({})
    .then((leaders)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(leaders)
    },(err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Leaders.create(req.body)
    .then((leader) => {
        console.log('Leader Created', leader);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(leader)
    },(err) => next(err))
    .catch((err) => next(err));
})
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('Put Operation is not Supported');
    })
    .delete((req, res, next) => {
        Promotions.remove({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json')
            res.json(resp)
        },(err) => next(err))
        .catch((err) => next(err));
    })

leaderRouter.route('/:leaderId')
    .get((req, res, next) => {
        Leaders.findById(req.params.leaderId)
        .then((leader) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json')
            res.json(leader)
        },(err) => next(err))
        .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('Post Operation is not Supported on leaders/' + req.params.leaderId);
    })
    .put((req, res, next) => {
        Leaders.findByIdAndUpdate(req.params.leaderId,{
            $set: req.body
        }, {new:true})
        .then((leader) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json')
            res.json(leader)
        },(err) => next(err))
        .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Leaders.findByIdAndRemove(req.params.leaderId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json')
            res.json(resp)
        },(err) => next(err))
        .catch((err) => next(err));
    })

module.exports = leaderRouter;    