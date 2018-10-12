const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema 
const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
    },
    location: {
        type: String,
    },
    participants: [
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String
            },
            attend: {
                type: Boolean
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Post = mongoose.model('post', PostSchema);