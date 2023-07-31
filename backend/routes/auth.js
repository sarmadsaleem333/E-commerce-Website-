const express = require("express");
const router = express.Router();
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");

const JWT_secret = "sarmad is a great man"// for auth token

//Route 1:create a user using Post request"/api/auth/createuser".No login required
router.post("/createuser", [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("phone", "Enter a valid phone number").isLength({ min: 11 }),
    body("password", "Password should be atleast 5 characters").isLength({ min: 5 })

], async (req, res) => {
    let success=false;
    let user =false;
    // if there are errors return the bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const response = errors.array();
        return res.status(400).json(response[0].msg);

    }
    try {
        //checking if the user exists or not
        user = await User.findOne({ email: req.body.email }) 
        if (user) {
            return res.status(400).json({  success,error: "Sorry a user with this email  already exists" })
        }
        user = await User.findOne({ phone: req.body.phone })
        if (user) {
            return res.status(400).json({user, success, error: "Sorry a user with this phone already exists" })
        }
        //
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            phone: req.body.phone
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_secret);
        success=true;
        user=true;
        res.json({user,success,authtoken});
    } catch (error) {
        console.log("Error: " + error.message);
    }

});

//Route 2:Login user using Post request"/api/auth/loginuser".Login required

router.post("/loginuser", [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Please enter a password").exists()
], async (req, res) => {
   let success=false;
   let user=false;
    const errors = validationResult(req);
    // if there are errors return the bad request
    if (!errors.isEmpty()) {
        const response = errors.array();
        return res.status(400).json(response[0].msg);

    }

    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            success=false; 
            return res.status(400).json({ success,error: "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success=false; 
            return res.status(400).json({  user,success,error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        };
        const authtoken = jwt.sign(data, JWT_secret);
        success=true;
        user=true;
        res.json({  user,success,authtoken });
    } catch (error) {
        console.log("Error: " + error.message);
    }
});


//Router 3: get user details by Post request"/api/auth/fetchuser" and providing token.Log in required.

router.post("/fetchuser", fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findOne({ _id: userId }).select("-password");
        res.send(user);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error occured");
    }
});

module.exports = router;