require('./config/mongoose');
const express = require('express');
const path = require('path');
const app = express();
const router = require('./page/routes');
const productRouter = require('./App/product-v1/routes');
const productRouter2 = require('./App/product-v2/routes');
const logger = require('morgan');

// Module Router
app.use(router);

app.use(logger('dev'));

// Menangani Request Body dengan Middleware
app.use(express.urlencoded({extended: true}));

// Menangani Request Body dengan Middleware Json
app.use(express.json());

// Menangani File Static
app.use('/public', express.static(path.join(__dirname, 'uploads', )));

// Router
app.use('/api/v1', productRouter);
app.use('/api/v2', productRouter2);

// Menangani Error 404
app.use((req, res, next) => {
    res.status(404);
    res.send({
        status: 'Failed',
        message: 'Resource ' + req.originalUrl + ' Not Found'
    });
});

app.listen(3000, () => console.log('Server: http://127.0.0.1:3000'));