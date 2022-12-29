const express = require('express');
const bodyParser = require('body-parser');

const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json())

promotionRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Will Send All promotions to You');
    })
    .post((req, res, next) => {
        res.end('Will Add the promotion' + req.body.name + 'of Details' + req.body.description);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('Put Operation is not Supported');
    })
    .delete((req, res, next) => {
        res.end('Delete Operation is not Supported');
    })
promotionRouter.route('/:promotionId')
    .get((req, res, next) => {
        res.end('Will Send Details of the promotion ' + req.params.promotionId + "to you");
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('Post Operation is not Supported on promotions/' + req.params.promotionId);
    })
    .put((req, res, next) => {
        res.write = 'Updatng the promotion ' + req.params.promotionId + '/n';
        res.end('Will update the promotion ' + req.body.name + 'with details ' + req.body.description);
    })
    .delete((req, res, next) => {
        res.end('Will Delete the promotion ' + req.params.promotionId);
    })

module.exports = promotionRouter;    