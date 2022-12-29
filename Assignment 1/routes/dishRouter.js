const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json())

dishRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Will Send All Dishes to You');
    })
    .post((req, res, next) => {
        res.end('Will Add the Dish' + req.body.name + 'of Details' + req.body.description);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('Put Operation is not Supported');
    })
    .delete((req, res, next) => {
        res.end('Delete Operation is not Supported');
    })
dishRouter.route('/:dishId')
    .get((req, res, next) => {
        res.end('Will Send Details of the Dish ' + req.params.dishId + "to you");
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('Post Operation is not Supported on dishes/' + req.params.dishId);
    })
    .put((req, res, next) => {
        res.write = 'Updatng the dish ' + req.params.dishId + '/n';
        res.end('Will update the dish ' + req.body.name + 'with details ' + req.body.description);
    })
    .delete((req, res, next) => {
        res.end('Will Delete the Dish ' + req.params.dishId);
    })

module.exports = dishRouter;    