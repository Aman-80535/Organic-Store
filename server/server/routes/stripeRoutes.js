const Order = require("../models/orderModel");
const express = require("express");
const { checkUser } = require("../middlewares/authMiddleware");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
require("dotenv").config()

const stripe = require("stripe")(
    process.env.STRIPE_SECRET_KEY
);

const router = express.Router();

router.post(
    "/create-checkout-session",
    express.json({ extended: true, limit: "30mb" }),
    checkUser,
    async (req, res) => {
        try {
            const taxRate = await stripe.taxRates.create({
                display_name: "GST",
                inclusive: false,
                percentage: 18,
                country: "IN",
            });
            const data = req.body;


            let items = await Promise.all(
                data.items.map(async (item) => {
                    let product = await Product.findById(item.productId);
                    return {
                        productId: product._id,
                        productImage: product.image,
                        productName: product.name,
                        price: product.price,
                        qty: item.qty,
                    };
                })
            );


            const line_items = items.map((item) => {
                return {
                    price_data: {
                        currency: "INR",
                        product_data: {
                            name: item.productName,
                            images: [item.productImage],
                        },

                        unit_amount: item.price * 100,
                    },
                    tax_rates: [taxRate.id],
                    quantity: item.qty,
                };
            });


            const session = await stripe.checkout.sessions.create({
                mode: "payment",
                payment_method_types: ["card"],
                line_items,
                customer_email: req.user.email,
                success_url: `${process.env.CLIENT_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,

                cancel_url: `${process.env.CLIENT_URL}/checkout/cancel`,
            });
            let subtotal = items.reduce((st, item) => st + item.price * item.qty, 0);
            let taxPer = subtotal * 0.18;
            let total = subtotal + taxPer;

            const newOrder = await new Order({
                userId: req.user._id,
                stripeSessionId: session.id,
                items: items,
                shipping: data.shipping,
                payment_status: "paid",
                total,
                subtotal,
            }).save();


            res.status(200).json({ url: session.url });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
);

module.exports = router;




module.exports = router