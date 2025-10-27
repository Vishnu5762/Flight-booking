import express from 'express';
import { createPaymentIntent } from '../controllers/paymentController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected route to create payment
router.post('/create-payment-intent', verifyToken, createPaymentIntent);

export default router;
