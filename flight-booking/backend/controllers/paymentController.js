import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'inr' } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount, // amount in smallest currency unit (e.g., paise for INR)
      currency,
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: 'Payment failed', error: error.message });
  }
};
