const express = require('express');
const router = express.Router();

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
    errors.push({msg: 'Please fill in all fields'});
    }

    //** Check if passwords match */
    if( password !== password2) {
    errors.push({ msg: 'Passwords do not match'})
    }

    //** Check password length */
    if(password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters'})
    }

    //** If error happens */
    if(errors.length > 0) {
        res.render('register',{
            errors,
            email,
            password,
            password2
        });
    }
});
//** Main page */
router.get('/', (req, res) => res.render('welcome'));

module.exports = router;