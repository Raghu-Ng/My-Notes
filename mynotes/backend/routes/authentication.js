const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require ('../middleware/fetchuser');

const JWT_SECRET = 'Raghava#th34'

// router.post('/', ({ req, res }) => {
//     console.log(req.body);
//     res.send("hello")
// });
//route 1 Creating user :post"/api/authen/createuser"
router.post("/createuser", [
    body('firstName', 'Enter a valid name').isLength({ min: 3 }),
    body('lastName', 'Enter a valid name'),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'min 8 char').isLength({ min: 8 }),
],
    async (req, res) => {
        let succes = false;
        //input verification for inputs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ succes, errors: errors.array() });
        }
        // check for the user's pre existence
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ succes, error: "user alredy exists, login" })
            }
            //pasword securing
            const salt = await bcrypt.genSalt(10);
            const SecPassword = await bcrypt.hash(req.body.password, salt);
            //new user creation
            user = await User.create({
                name: req.body.firstName +' '+ req.body.lastName ,
                email: req.body.email,
                password: SecPassword,
            })
            const data ={
                user:{
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            succes= true
            res.json({succes, authtoken});
            // res.json(user);

        } catch (error) {
            console.error(error.message);
            res.status(500).send('some error occured')
        }
            //extra 
        // .then(user => res.json(user))
        // .catch(err => {console.log(err);
        // res.json({ error: 'Please enter a unique valid email id', message: err.message });    
        // //   res.send(req.body)
        // })

    })
    //route2 login input :post"/api/authen/login"- without login
router.post("/login", [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'password cannot be blank').exists(),
],
    async (req, res) => {
        let succes = false;
        //check for errors in the input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({succes, errors: errors.array() });
        }

        const {email, password} = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user){
            return res.status(400).json({succes, error: "enter the proper login details"});
        }

        const passwordCompare = await bcrypt.compare (password, user.password)
        if (!passwordCompare){
            succes = false;
            return res.status(400).json({ succes , error: "enter the proper login details"});
        } 
        
        const data ={
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        succes = true;
        res.json({succes, authtoken});

        } catch (error) {
            console.error(error.message);
            res.status(500).send('internal server error ');
        }
    })

//route 3 get login user details: post"/api/authen/userdetails" after login
router.post("/userdetails", fetchuser, async (req, res) => {
    try {
        const userid = req.user.id;
        const user = await User.findById(userid).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('internal server error');
    }
});

module.exports = router;