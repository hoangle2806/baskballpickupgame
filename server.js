const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

//import routes:
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

//initialize the app
const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

//DB config d
const db = require('./config/keys').mongoURI;
mongoose.connect(db, { useNewUrlParser: true})
    .then( () => console.log(`Mongo DB connected at ${Date().toLocaleString()}`))
    .catch( err => console.log(err));

// Passport middleward
app.use(passport.initialize());

//Passport config
require('./config/passport')(passport);

//API routes
app.use('/api/user', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts)

//===========For Production Purpose==============

// Server static assests if in production
if(process.env.NODE_ENV === "production"){
    // set static folder
    app.use(express.static('client/build'));
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

//==============================================

//Port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server runing on port ${port}`));