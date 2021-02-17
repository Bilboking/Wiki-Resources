const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')

//** Welcome page (not signed in) */
router.get('/', (req, res) => res.render('welcome'));

//** all-articles page */
router.get('/all-articles', (req, res) => {
    res.render('all-articles')
})

//** Dashboard (once signed in) */
router.get('/dashboard', ensureAuthenticated, (req, res) => 
    res.render('dashboard', {
        email: req.user.email
    }));


module.exports = router;