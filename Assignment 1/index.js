const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const dishRouter = require('./Routes/dishRouter');
const promotionRouter = require('./Routes/promotionRouter');
const leaderRouter =  require('./Routes/leaderRouter')

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/dishes', dishRouter);
app.use('/promotions', promotionRouter);
app.use('/leaders', leaderRouter)

app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
    res.statusCode = 200;
    res.header('ContentType','text/html');
    res.end('<html><body><h1>Express Router</h1></body></html>')
})

const server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`Server Runing at http://${hostname}:${port}`);
})