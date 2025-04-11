const router = require('express').Router();

// This is your test secret API key.
const stripe = require('stripe')('sk_test_51RAKkdQEsu3DFC0UhmqzexpdisBg3aJSh2OHUuzSQ4lCqSmzPqeejoD5ALf3jID5ma8dTSil5jfD4GltNG3abyA300DA9xNJB5');

let YOUR_DOMAIN;

if(process.env.NODE_ENV === 'production'){
  YOUR_DOMAIN = 'https://athletic-admission-web-app.onrender.com'
}
else YOUR_DOMAIN = 'http://localhost:3000'


router.post('/create-checkout-session', async (req, res) => {
    let {eventPrice, parking, parkingPrice} = req.body;

    typeof eventPrice !== 'number' ? eventPrice = parseInt(eventPrice)  : null;
    typeof parkingPrice !== 'number' ? parkingPrice = parseInt(parkingPrice) : null;

    let parkingPrices = {
        0: 'price_1RAfg7QEsu3DFC0UVtZr6qEg',
        5: 'price_1RAeqGQEsu3DFC0UhQUGkK6u',
        10: 'price_1RAfNrQEsu3DFC0UHhTeOl2h',
        15: 'price_1RAfOuQEsu3DFC0UFNy5QCmK'
    }

    let admissionPrices = {
        10: 'price_1RAerrQEsu3DFC0UAa5w2Ifh',
        15: 'price_1RAf4YQEsu3DFC0UShV8Odkc',
    }

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: admissionPrices[eventPrice],
        quantity: 1,
      },
      {
        price: parkingPrices[parkingPrice.toFixed(0)],
        quantity: 1
      }

    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/orders/confirmation`,
    cancel_url: `${YOUR_DOMAIN}/orders/cancel`,
  });

  res.json({url: session.url});
});

module.exports = router;