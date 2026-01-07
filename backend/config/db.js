import mongoose from "mongoose";
export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://sadiajavid:sadia12345@cluster0.zw0seaa.mongodb.net/food-delivery').then(()=>{
        console.log("DB Connected")
    })
}
