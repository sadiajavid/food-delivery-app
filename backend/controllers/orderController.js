import orderModel from "../models/orderModel.js"
import userModel from '../models/userModel.js'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const frontend_url = "http://localhost:5173"
const placeOrder = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const newOrder = new orderModel({
            userId: req.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });

        await newOrder.save();

        await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: { name: item.name },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        }));

        // Delivery Fee
        line_items.push({
            price_data: {
                currency: "usd",
                product_data: { name: "Delivery Fee" },
                unit_amount: 200,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log("PLACE ORDER ERROR:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === true || success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            res.json({ success: true, message: "Paid" })
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: 'Not Paid' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error' })
    }
}
const userOrder = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.userId })
        res.json({ success: true, data: orders })
    } catch (error) {
        res.json({ success: false, message: "Error" })

    }
}
//listing oredr for admin panel 
const listorders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log({ success: false, message: 'Error' })
    }
}

//api for updating status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({ success: true, message:'Status Updated' })
    } catch (error) {
        console.log({ success: false, message: 'Error' })
    }
}

export { placeOrder, verifyOrder, userOrder, listorders,updateStatus } 