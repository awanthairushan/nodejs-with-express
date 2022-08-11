const router = require("express").Router();
const {check, validationResult} = require("express-validator")
const User = require("../models/Users");
const bcrypt = require('bcrypt');
const JWT = require("jsonwebtoken");

router.post("/signup", [
    check("email", "Please provide valid email").isEmail(),
    check("password", "Please provide min 6 length password").isLength({min: 6})
], async (req, res) => {

    const {email, password} = req.body;


    //Validate email, password
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }


    //validate user doesn't exit on system
    const users = await User.find();
    let alreadyUse;
    users.map(user => {

        if (user.email === email) {
            alreadyUse = email
        }
    })


    if (alreadyUse === email) {
        res.status(400).json({
            "errors": [
                {
                    "value": "fgbgthbtail.com",
                    "msg": "User Already exit",
                    "param": "email",
                    "location": "body"
                }

            ]
        })
    } else {

        //your-256-bit-secret
        ''
        const token = await JWT.sign({
            email
        }, process.env.Jwt_Key_secret,{
            expiresIn: 3600000
        })
        // Add data to db

        let hashedPassword = await bcrypt.hash(password, 10);

        const userNew = new User({
            email: email,
            password: hashedPassword
        });
        try {
            await userNew.save();
            res.json({
                "token" : token
            });
        } catch (err) {
            res.json({message: err});
        }
    }
})

router.post("/login", [
    check("email", "Please provide valid email").isEmail(),
    check("password", "Please provide min 6 length password").isLength({min: 6})
], async (req, res) => {

    const {email, password} = req.body;


    //Validate email, password
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }


    //validate user doesn't exit on system
    const users = await User.find();
    let UseEmail, UsePassword;

    users.map(user => {

        if (user.email === email) {
            UseEmail = email
            UsePassword = bcrypt.compare(password,user.password)
        }
    })


    if (UseEmail !== email || !UsePassword) {
        res.status(400).json({
            "errors": [
                {
                    "value": "fgbgthbtail.com",
                    "msg": "Check again username and password",
                    "param": "email",
                    "location": "body"
                }

            ]
        })
    } else {

        const token = await JWT.sign({
            email
        }, process.env.Jwt_Key_secret,{
            expiresIn: 3600000
        })

        // send Jwt to user
        try {
            res.json({
                "token" : token
            });
        } catch (err) {
            res.json({message: err});
        }
    }

})

module.exports = router