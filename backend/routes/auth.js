
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = 'hellobro'

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('fname', 'Please enter a valid name').isLength({ min: 3 }),
    body('email', 'Please enter a valid name').isEmail(),
    body('crt_password', 'Enter password atleast 5 characters long').isLength({ min: 5 }),

], async (req, res) => {

    let success=false;

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }
    // Check whether the user with this email exists already

    try {


        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.crt_password, salt);
        //create a new user
        user = await User.create({
            firstName: req.body.fname,
            lastName: req.body.lname,
            password: secPass,
            email: req.body.email
        });

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data , JWT_SECRET);
        console.log(authToken);
        success=true;
        res.json({success, authToken});
    }
    //catch errors
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }

});

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Please enter a valid name').isEmail(),
    body('password', 'Password cannot be blank').exists()

], async (req, res) => {

    let success=false;

     // If there are errors, return Bad request and the errors
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({success, error: "Please try to login with correct credentials"});
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data , JWT_SECRET);
        console.log(authToken);
        success=true;
        res.json({success, authToken, email});

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }


});

// ROUTE 3: Get logged in user details: POST "/api/auth/getuser". Login required

router.post('/getuser', fetchUser,  async (req, res) => {
    try {
        const UserId = req.user.id;
        const user = await User.findById(UserId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }
})
module.exports = router;