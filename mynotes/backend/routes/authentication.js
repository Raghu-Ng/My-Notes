const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// router.post('/', ({ req, res }) => {
//     console.log(req.body);
//     res.send("hello")
// });
// Creating user :post"/api/authen/createuser"
router.post("/createuser", [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'min 8 char').isLength({ min: 8 }),
],
    async (req, res) => {
        //input verification for inputs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // check for the user's pre existence
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "user alredy exists, login" })
            }
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            })
            res.json(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('some error occured')
        }

        // .then(user => res.json(user))
        // .catch(err => {console.log(err);
        // res.json({ error: 'Please enter a unique valid email id', message: err.message });    
        // //   res.send(req.body)
        // })

    })


module.exports = router;