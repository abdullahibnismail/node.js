const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const dishRouter = require('./Routes/dishRouter')

const hostname = 'localhost'
const port = 3000;

const app = express();

app.use(morgan('dev'))
app.use(bodyParser.json())


//******Without Routing*******/
//************************* */

// app.all('/dishes',(req,res,next) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type','text/plain')
//     next();
// })

// //For Dishes
// app.get('/dishes',(req,res,next) => {
//     res.end('Wll send all dishes to you')
// })

// app.post('/dishes',(req,res,next) => {
//     res.end('Wll add the dish' + req.body.name + ' with details: ' + req.body.description)
// })

// app.put('/dishes',(req,res,next) => {
//     res.statusCode = 403;
//     res.end('Put Operation is not supported')
// })

// app.delete('/dishes',(req,res,next) => {
//     res.end('Delete Operation is not supported')
// })

// //For Dishes/:dishId
// app.get('/dishes/:dishId',(req,res,next) => {
//     res.end('Wll send Details of the Dish' + req.params.dishId + ' to you')
// })

// app.post('/dishes/:dishId',(req,res,next) => {
//     res.statusCode = 403;
//     res.end('post Operation is not supported on dishes/' + req.params.dishId)
// })

// app.put('/dishes/:dishId',(req,res,next) => {
//     res.write('Updating the dish' + req.params.dishId + '\n')
//     res.end('Will update the dish:' + req.body.name + 'And Detail: ' + req.body.description)
// })

// app.delete('/dishes/:dishId',(req,res,next) => {
//     res.end('Deleting dish: ' + req.params.dishId)
// })


app.use('/dishes', dishRouter)
// app.use('/dishes/:dishId ', dishRouter)
app.use(express.static(__dirname+'/public'))



app.use((req,res,next) => {
    // console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html')
    res.end('<html><body><h1>Express Server</h1></body></html>')
})

const server = http.createServer(app)

server.listen(port,hostname,() => {
    console.log(`Server Running at http://${hostname}:${port}`);
})