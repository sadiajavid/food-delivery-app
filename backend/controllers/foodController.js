import foodModel from "../models/foodModel.js";
import fs from 'fs';

//add food item
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try {
        await food.save();
        res.json({
            success: true,
            message: "Food Added"
        })
    } catch (error) {
        console.log(error),
            res.json({
                success: false,
                message: "Error"
            })
    }

}
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({
            success: true,
            data: foods
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })
    }
}
const removeFood = async (req, res) => {

    try {
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`, () => { })
        if (!food) {
            return res.json({
                success: false,
                message: "Food not found"
            });
        }

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({
            success: true,
            message: "Food Removed"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: 'Error'
        })

    }

}
const updateFood = async (req, res) => {
    try {
        const { id, name, description, price, category } = req.body;

        const updateData = { name, description, price, category };

        if (req.file) {
            updateData.image = req.file.filename;
        }


        const updatedFood = await foodModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedFood) {
            return res.json({ success: false, message: "Food not found" });
        }

        res.json({ success: true, message: "Food updated successfully", data: updatedFood });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Server error" });
    }
};

export { addFood, listFood, removeFood, updateFood }