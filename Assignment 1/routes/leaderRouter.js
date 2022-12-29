const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json())

leaderRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Will Send All leaders to You');
    })
    .post((req, res, next) => {
        res.end('Will Add the leader' + req.body.name + 'of Details' + req.body.description);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('Put Operation is not Supported');
    })
    .delete((req, res, next) => {
        res.end('Delete Operation is not Supported');
    })
leaderRouter.route('/:leaderId')
    .get((req, res, next) => {
        res.end('Will Send Details of the leader ' + req.params.leaderId + "to you");
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('Post Operation is not Supported on leaders/' + req.params.leaderId);
    })
    .put((req, res, next) => {
        res.write = 'Updatng the leader ' + req.params.leaderId + '/n';
        res.end('Will update the leader ' + req.body.name + 'with details ' + req.body.description);
    })
    .delete((req, res, next) => {
        res.end('Will Delete the leader ' + req.params.leaderId);
    })

module.exports = leaderRouter;    