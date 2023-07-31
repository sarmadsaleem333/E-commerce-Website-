const express = require("express");
const router = express.Router();
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Vendor = require("../models/Vendor");
 const fetchvendor = require("../middleware/fetchvendor");

const JWT_secret = "sarmad is a great man"// for auth token

//Route 1:create a vendor using Post request"/api/auth/createvendor".No login required
router.post("/createvendor", [
    body("brandname", "Enter a valid brandname").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("phone", "Enter a valid phone number").isLength({ min: 11 }),
    body("password", "Password should be atleast 5 characters").isLength({ min: 5 }),
], async (req, res) => {
    let success=false;
    let vendor=false;
    // if there are errors return the bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const response = errors.array();
        return res.status(400).json(response[0].msg);

    }
    try {
        let vendor = await Vendor.findOne({ email: req.body.email })
        //checking if the vendor exists or not 
        if (vendor) {
            return res.status(400).json({ success,error: "Sorry a vendor with this email  already exists" })
        }
        vendor = await Vendor.findOne({ phone: req.body.phone })
        if (vendor) {
            return res.status(400).json({ success,error: "Sorry a vendor with this phone already exists" })
        }
//

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        vendor = await Vendor.create({
            brandname: req.body.brandname,
            email: req.body.email,
            password: secPass,
            phone: req.body.phone
        });
        const data = {
            vendor: {
                id: vendor.id
            }
        }
        const authtoken = jwt.sign(data, JWT_secret);
        success=true;
        res.json({success,authtoken});
    } catch (error) {
        console.log("Error: " + error.message);
    }

});

//Route 2:Login vendor using Post request"/api/auth/loginvendor".Login required

router.post("/loginvendor", [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Please enter a password").exists()
], async (req, res) => {
   let success= false;
    const errors = validationResult(req);
    // if there are errors return the bad request
    if (!errors.isEmpty()) {
        const response = errors.array();
        return res.status(400).json(response[0].msg);
    }

    try {
        const { email, password } = req.body;
        let vendor = await Vendor.findOne({ email });
        if (!vendor) {
            return res.status(400).json({ success,error: "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, vendor.password);
        if (!passwordCompare) {
            return res.status(400).json({success, error: "Please try to login with correct credentials" });
        }

        const data = {
            vendor: {
                id: vendor.id
            }
        };
        const authtoken = jwt.sign(data, JWT_secret);
        success=true;
        res.json({ success, authtoken });
    } catch (error) {
        console.log("Error: " + error.message);
    }
});


//Router 3: get vendor details by Post request"/api/auth/fetchvendor" and providing token.Log in required.

router.post("/fetchvendor", fetchvendor, async (req, res) => {
    try {
        vendorId = req.vendor.id;
        const vendor = await Vendor.findOne({_id:vendorId}).select("-password");
        res.send(vendor);
    }
    catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error occured");
}
});

module.exports = router;