const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
    const { items, email } = req.body;

    // Transform items array from basket into format for Stripe
    const transformedItems = items.map(item => ({
        quantity: 1,
        price_data: {
            currency: 'usd', 
            unit_amount: item.price * 100,
            product_data: {
                name: item.title,
                images: [item.image],
                description: item.description
            },
        }
    }));

    // create stripe checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_options: [
            {
            shipping_rate: 'shr_1O99y1CJCcYvG8jkhrKytiiB'
            }
        ],
        shipping_address_collection: {
            allowed_countries: ['US', 'GB', 'CA'],
        },
        line_items: transformedItems,
        mode: 'payment',
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(items.map(item => item.image))
        }
    });

    res.status(200).json({ id: session.id})
};