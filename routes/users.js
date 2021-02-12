const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//** User model */
const User = require('../models/User')

//** Login page */
router.get('/login', (req, res) => res.render('login'));

//** Register page */
router.get('/register', (req, res) => res.render('register'));


//** Register Handle */
router.post('/register', (req, res) => {
  const { email, password, password2} = req.body;
    let errors = []

   //** Check required fields */
    if(!email || !password || !password2) {
    errors.push({msg: 'Please fill in all fields.'});
    }

    //** Check if passwords match */
    if( password !== password2) {
    errors.push({ msg: 'Passwords do not match.'})
    }

    //** Check password length */
    if(password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters.'})
    }

    //** If error happens */
    if(errors.length > 0) {
        res.render('register',{
            errors,
            email,
            password,
            password2
        });
    } else {
        //** If validation passes */
        User.findOne({ email: email })
            .then(user => {
                if(user) {
                    //** User exist */
                    res.push({ msg: 'Email is already registered'});
                    res.render('register',{
                    errors,
                    email,
                    password,
                    password2
                    });
                } else {
                    const newUser = new User({
                        email,
                        password
                    });

                    //** Hash password */
                    bcrypt.genSalt(10, (err, salt) => 
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            //** Set password to hashed */
                            newUser.password = hash;
                            //** Save user */
                            newUser.save()
                                .then(user => {
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err));

                        }))
                    }
                });
            }
    
});
//** Main page */
router.get('/', (req, res) => res.render('welcome'));

module.exports = router;