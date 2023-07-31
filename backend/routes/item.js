const express = require('express');
const router = express.Router();
const fetchvendor = require('../middleware/fetchvendor');
const Item = require('../models/Item');
const { validationResult, body } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
// const multer = require('multer');

// Set up Multer to handle file uploads
// const upload = multer({ dest: 'uploads/' });
// , upload.single('photo')
// Route 1: Adding item using POST "/api/item/additem" (Login required)
router.post('/additem', fetchvendor, [
    body('name').isLength({ min: 5 }).withMessage('Enter a name of at least 5 characters'),
    body('type').isIn(['fashion', 'grocery', 'electronic device']).withMessage('Invalid brand selection.'),
    body('description').isLength({ min: 10 }).withMessage('Enter a description of at least 10 characters'),
    body('price').exists().withMessage('Price is required'),
    body('photoUrl').optional(),
    body('quantity', "Please enter the quantity").exists()

], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const response = errors.array();
        return res.status(400).json(response[0].msg);
    }

    try {
        // Extract item details from the request body

        const { name, type, description, price, photoUrl, quantity } = req.body;
        const vendorId = req.vendor.id;


        const newItem = await Item.create({
            name,
            type,
            description,
            price,
            vendor: vendorId,
            photoUrl,
            quantity
        });

        res.status(201).json("Item uploaded successfully");
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the item' });
        console.log(error)
    }
});


//Route 2: Route to fetch all items of the logged in vendor using GET request "/api/item/fetchmyitems"
router.get("/fetchmyitems", fetchvendor, async (req, res) => {

    try {
        let items = await Item.find({ vendor: req.vendor.id });
        res.json(items);

    } catch (error) {

        res.status(400).json("Internal Server Error occured");
    }
});

//Route 3: Route update item of the logged in vendor using PUT request "/api/item/updateitem/:id"

router.put("/updateitem/:id", async (req, res) => {
    try {

        const { name, description, price, photoUrl, quantity } = req.body;
        const newItem = {};
        if (name) { newItem.name = name; }
        if (description) { newItem.description = description; }
        if (price) { newItem.price = price; }
        if (photoUrl) { newItem.photoUrl = photoUrl; }
        if (quantity) { newItem.quantity = quantity; }

        let item = await Item.findById(req.params.id);

        if (!item) { return res.status(404).send("Not found"); }
        item = await Item.findByIdAndUpdate(req.params.id, { $set: newItem }, { new: true });
        res.json("Your item has been successfully updated")


    } catch (error) {
        console.log(error)
        res.status(400).json("Internal Server Error occured");
    }
});


//Route 4: Route delete item of the logged in vendor using PUT request "/api/item/deleteitem/:id"

router.put("/deleteitem/:id", async (req, res) => {
    try {
        let item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json("Not found");
        }
        item = await Item.findByIdAndDelete(req.params.id)
        res.json("Your item has been succesfully deleted");

    } catch (error) {
        res.status(400).json("Internal Server Error occured");
    }
});

router.get("/getallitems", fetchuser, async (req, res) => {

    try {
        let items = await Item.find();
        res.json(items);

    } catch (error) {
   console.log(error)
        res.status(400).json("Internal Server Error occured");
    }
});

module.exports = router;
