const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load User Model:
const User = require('../../models/User');

//Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @route GET api/users/register
// @desc Register User
// @access Public
router.post('/register', (req,res) => {
    const {errors, isValid} = validateRegisterInput(req.body);

    //Check validation:
    if (!isValid) {
        return res.status(400).json(errors)
    }
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user){
                errors.email = "Email already exists";
                return res.status(400).json(errors);
            } else{ 
                const avatar = gravatar.url(req.body.email, {
                    s: '200', // Size
                    r: 'pg', // Rating
                    d: 'mm' // Default
                })
                //create a new user
                const newUser = new User({
                    name : req.body.name,
                    email: req.body.email,
                    avatar : avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err,salt) => {
                    bcrypt.hash(newUser.password, salt, (err,hash)=>{
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                });
            } 
        })
})

// @Route POST api/users/login
// @desc Login User / Returning JWT Toekn
// @access public
router.post('/login', (req,res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    
    //Check for validation:
    if (!isValid){
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if(!user){
                errors.email = "user not found";
                return res.status(404).json(errors);
            }

            //Check for password
            bcrypt.compare(password, user.password).then( isMatch =>{
                if(isMatch){
                    const payload = {id : user.id, name: user.name, avatar: user.avatar};

                    //assign a token
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        { expiresIn: 3600 },
                        (err,token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            });
                        }
                    );
                }else {
                    errors.password = 'Password incorrect';
                    return res.status(400).json(errors);
                }
            })
        })
})

// @Route GET api/users/current
// @desc return current user
// @access Private
router.get(
    '/current',
    passport.authenticate('jwt', { session: false}),
    (req,res) => {
        res.json({
            id : req.user.id,
            name: req.user.name,
            email: req.user.email,
        });
    }
)


// @route GET api/user
// @des test user route
// @access Public
router.get("/", (req,res) => res.json({ msg : "From Users"}));

module.exports = router;