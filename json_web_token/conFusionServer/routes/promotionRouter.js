const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//importing Model
const Promotions = require('../modals/promotions')
const authenticate = require('../authenticate');

const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json())

promotionRouter.route('/')
    .get((req, res, next) => {
        Promotions.find({})
        .then((promotions)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json')
            res.json(promotions)
        },(err) => next(err))
        .catch((err) => next(err));
    })
    .post(authenticate.verifyUser,(req, res, next) => {
        Promotions.create(req.body)
        .then((promotion) => {
            console.log('Promotion Created', promotion);
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json')
            res.json(promotion)
        },(err) => next(err))
        .catch((err) => next(err));
    })
    .put(authenticate.verifyUser,(req, res, next) => {
        res.statusCode = 403;
        res.end('Put Operation is not Supported');
    })
    .delete(authenticate.verifyUser,(req, res, next) => {
        Promotions.remove({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json')
            res.json(resp)
        },(err) => next(err))
        .catch((err) => next(err));
    })


promotionRouter.route('/:promotionId')
.get((req, res, next) => {
    Promotions.findById(req.params.promotionId)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(promotion)
    },(err) => next(err))
    .catch((err) => next(err));
})
    .post(authenticate.verifyUser,(req, res, next) => {
        res.statusCode = 403;
        res.end('Post Operation is not Supported on promotions/' + req.params.promotionId);
    })
    .put(authenticate.verifyUser,(req, res, next) => {
        Promotions.findByIdAndUpdate(req.params.promotionId,{
            $set: req.body
        }, {new:true})
        .then((promotion) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json')
            res.json(promotion)
        },(err) => next(err))
        .catch((err) => next(err));
    })
    .delete(authenticate.verifyUser,(req, res, next) => {
        Promotions.findByIdAndRemove(req.params.promotionId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json')
            res.json(resp)
        },(err) => next(err))
        .catch((err) => next(err));
    })

module.exports = promotionRouter;    