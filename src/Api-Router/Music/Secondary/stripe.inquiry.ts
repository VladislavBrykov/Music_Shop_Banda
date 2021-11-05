import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export async function stripeInquiry(stripeEmail, stripeToken, finalPrice) {
  stripe.customers
    .create({
      email: stripeEmail,
      source: stripeToken,
    })
    .then((customer) => {
      return stripe.charges.create({
        amount: Number(finalPrice.toString() + '00'),
        description: process.env.STRIPE_DESCRIPTION_PAY,
        currency: process.env.STRIPE_CURRENCY,
        customer: customer.id,
      });
    });
}
