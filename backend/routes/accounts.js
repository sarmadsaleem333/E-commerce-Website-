const express = require("express");
const router = express.Router();
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const Item = require('../models/Item');
const Vendor = require("../models/Vendor");
const TransactionHistory = require("../models/TransactionHistory");
const fetchuser = require("../middleware/fetchuser");
const fetchvendor = require("../middleware/fetchvendor");
const mongoose = require("mongoose");


// route 1:to add balance to user account by post request using:/api/accounts/useraddbalance login required
router.post("/useraddbalance", fetchuser, [
    body("balance").isNumeric().withMessage('Balance must be a number').isFloat({ min: 100 }).withMessage('You can add a minimum of 100'),
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const response = errors.array();
        return res.status(400).json(response[0].msg);
    }
    try {
        const { balance } = req.body;

        const newUser = {};
        let user = await User.findById(req.user.id);
        newUser.balance = balance + user.balance;
        const transactionhistory = await TransactionHistory.create({
            user: req.user.id,
            credit: balance,
        });
        user = await User.findByIdAndUpdate(req.user.id, { $set: newUser }, { new: true })
        res.json(`You have succesfully deposited Rs.${balance} in your account`);

    } catch (error) {

        res.status(400).json("Internal Server Error occured");
    }
});


// route 3:to buy items using post request using:/api/accounts/buyitems/:id login required

router.put("/buyitems/:id", fetchuser, fetchvendor, async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        let item = await Item.findById(req.params.id);
        let vendor = await Vendor.findById(item.vendor);
        if (item.quantity == 0) {
            return res.status(400).json("Sorry this item is out of stock");
        }
        if (user.balance < item.price) {
            return res.status(400).json("Sorry you do not have enough balance");
        }
        const newItem = { ...item.toObject(), quantity: item.quantity - 1 };
        const newUser = { ...user.toObject(), balance: user.balance - item.price };
        const newVendor = { ...vendor.toObject(), earnings: vendor.earnings + item.price };
        let iteM = await Item.findById(req.params.id); // just for getting name of item 
        const name= iteM.name; 
        const transactionhistory = await TransactionHistory.create({
            user: req.user.id,
            item: name,
            vendor: item.vendor,
            price: item.price,

        });

        user = await User.findByIdAndUpdate(req.user.id, { $set: newUser }, { new: true });
        vendor = await Vendor.findByIdAndUpdate(item.vendor, { $set: newVendor }, { new: true });
        item = await Item.findByIdAndUpdate(req.params.id, { $set: newItem }, { new: true });
        res.json("Congratulations! " + user.name + " You have sucessfully bought " + item.name);

    } catch (error) {

        console.log(error)
        res.status(400).json("Internal Server Error occured");
    }

});

//route 4:  to get all transcations of user: using put /api/accounts/userhistory login required

router.put("/userhistory", fetchuser, async (req, res) => {
    try {
        let transactionhistory = await TransactionHistory.find({ user: req.user.id });

        res.json(transactionhistory);
    } catch (error) {
        res.status(400).json("Internal Server Error occured");
    }
});

//route 5:  to get all transcations of vendor: using put /api/accounts/vendorhistory login required

router.put("/vendorhistory", fetchvendor, async (req, res) => {
    try {
        let transactionhistory = await TransactionHistory.find({ vendor: req.vendor.id });
        res.json(transactionhistory);
    } catch (error) {
        res.status(400).json("Internal Server Error occured");
    }
});


module.exports = router;
