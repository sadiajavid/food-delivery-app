import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// App config
const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json()); // This is required to parse JSON requests

// DB Connection
connectDB();

// API endpoints
app.use("/api/food", foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// Root endpoint
app.get("/", (req, res) => {
    res.send('API WORKING');
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
