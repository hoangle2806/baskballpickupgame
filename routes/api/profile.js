
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load data model
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//Load Validation
const validateProfileInput = require('../../validation/profile');

// @route GET api/profile
// @desc Get current users profile

router.get(
    '/', 
    passport.authenticate('jwt', {session: false}),
    (req,res) => {
        const errors = {};
        Profile.findOne({ user: req.user.id })
            .populate('user')
            .then(profile => {
                if(!profile){
                    errors.noprofile = "There is no profile for this user";
                    return res.status(404).json(errors);
                }
                res.json(profile);
            })
            .catch(err => res.status(404).json(err));
    })

// @route DELETE api/profile
// @desc delete user and profile
// @access Private
router.delete(
    '/',
    passport.authenticate('jwt', { session: false}),
    (req,res) => {
        Profile.findOneAndRemove({ user: req.user.id}).then( () => {
            User.findOneAndRemove({ _id: req.user.id}).then( ()=> res.json({ success: true }))
        })
    }
)


// @Route POST api/profile
// @desc Create or edit user profile
// @access Private
router.post(
    '/',
    passport.authenticate('jwt', { session: false}),
    (req,res) => {
        const { errors, isValid } = validateProfileInput(req.body);

        //check validation
        if (!isValid){
            return res.status(400).json(errors);
        }

        //get fields:
        const profileFields = {};
        profileFields.user = req.user.id;
        if (req.body.handle) profileFields.handle = req.body.handle;
        if (req.body.location) profileFields.location = req.body.location;
        if (req.body.experience) profileFields.experience = req.body.experience;

        Profile.findOne({ user: req.user.id}).then(profile => {
            if (profile){
                // UPDATE
                Profile.findOneAndUpdate(
                    { user: req.user.id},
                    { $set: profileFields},
                    { new: true }
                ).then(profile => res.json(profile));
            } else {
                //CREATE
                new Profile(profileFields).save().then(profile => res.json(profile))
            }
        })
    }
)

module.exports = router;