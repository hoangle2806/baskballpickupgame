const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load data Model:
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// @Route GET api/posts
// @desc get posts
// @access Public
router.get('/', (req,res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostfound: "No post found"}))
})

// @route GET api/posts/:id
// @desc Get post by Id
// @access Public
router.get('/:id', (req,res) =>{
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({ nopostfound: "No Post Found with this id"}));
});

// @route DELETE api/posts/:id
// @desc Delete post
// @access Private
router.delete(
    '/:id',
    passport.authenticate('jwt', {session : false}),
    (req,res) =>{
        Profile.findOne({ user: req.user.id}).then(profile =>{
            Post.findById(req.params.id)
                .then(post =>{
                    if (post.user.toString() !== req.user.id){
                        return res.status(401).json({notAuthorized: "User not authorized"})
                    }
                    //Delete
                    post.remove().then( () => res.json({ success: true}));
                })
                .catch(err => res.status(404).json({postNotFound: "No Post Found"}));
        })
    }
);

// @Route POST api/posts
// @Desc Create post
// @access private
router.post(
    '/',
    passport.authenticate('jwt',{ session: false }),
    (req,res) => {
        const newPost = new Post({
            text : req.body.text,
            location: req.body.location,
            user: req.user.id,
            name: req.user.name,
            avatar: req.user.avatar,
        })
        newPost.save().then(post => res.json(post));
    }
)

// @route POST api/posts/comment/:id
// @desc add comment to post
// @access Private
router.post(
    '/comment/:id',
    passport.authenticate('jwt', { session: false }),
    (req,res) => {
        Post.findById(req.params.id)
            .then(post => {
                const newComment = {
                    text : req.body.text,
                    attend: req.body.attend,
                    user: req.user.id
                }

                //Add To comments array
                post.participants.unshift(newComment);
                //save
                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({ postnotfound: "No Post Found"}))
    }
);

// @route GET Post
// @desc Test get post
// @access public
router.get('/',(req,res) => res.json({msg: "From Posts"}))

module.exports = router;