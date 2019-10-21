const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const { isAuthenticated } = require('../helpers/auth');

router.get('/users/signin', (req, res) => {
    res.render('login');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', async (req,res) =>{
    const {name, email, password, confirm_password} = req.body;
    const errors = [];

    if (password != confirm_password) {
        errors.push({text: 'Passwords do not match'});
    }

    if(errors.length > 0){
        res.render('users/signup', {errors, name, email, password, confirm_password});
    }else{
        const emailUser = await User.findOne({email: email});
        if (emailUser) {
            req.flash('error_msg', 'The email is already registered');
            res.redirect('/users/signup');
        }
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        res.redirect('/users/signin');
    }
});

router.get('/users/logout', isAuthenticated, (req,res)=>{
    req.logOut();
    res.redirect('/');
});

module.exports = router;