import express from 'express';
import cookieParser from 'cookie-parser';
import { PORT } from './config/env.js';

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.routes.js';
import SubcriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import arjectMiddleware from './middlewares/arcjet.middleware.js';
import workflowRouter from './routes/workflow.route.js';
import productRouter from './routes/product.router.js';



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(arjectMiddleware)

// ( categorize routes )
// api/v1/auth/sign-up
app.use('/api/v1/auth',authRouter);
// app.use("api/v1/products", productRouter)
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', SubcriptionRouter);
app.use('/api/v1/workflows', workflowRouter);
app.use('/api/v1/product',productRouter)

app.use(errorMiddleware)


app.get('/',(req,res)=> {
    res.send('welcome to the Subcription Tracker API');
});

app.listen(PORT,async() => {
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);
    await connectToDatabase();
});

export default app;