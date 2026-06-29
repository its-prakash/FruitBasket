const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors')
app.use(cors({
    origin: ['http://localhost:4200'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const cartRoute = require('./routes/cart.routes')
const orderRoute = require('./routes/order.routes')


app.use('/api/users',userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart',cartRoute);
app.use('/api/order',orderRoute)


module.exports = app;