import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";

const SubcriptionRouter = Router();

SubcriptionRouter.get('/', (req, res) => { res.send({ title: 'GET all subscriptions' }) });

SubcriptionRouter.get('/:id', (req, res) => { res.send({ title: 'GET subscriptions details' }) });

SubcriptionRouter.post('/', authorize,createSubscription);

SubcriptionRouter.put('/:id', (req, res) => { res.send({ title: 'UPDATE all subscriptions' }) });

SubcriptionRouter.delete('/:id', (req, res) => { res.send({ title: 'DELETE all subscriptions' }) });

SubcriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

SubcriptionRouter.put('/:id/cancel', (req, res) => { res.send({ title: 'CANCEL all subscriptions' }) });

SubcriptionRouter.get('/upcoming-renewals', (req, res) => { res.send({ title: 'GET upcoming renewals' }) });

export default SubcriptionRouter
