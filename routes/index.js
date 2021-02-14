const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')

//** Welcome page (not signed in) */
router.get('/', (req, res) => res.render('welcome'));

//** Dashboard (once signed in) */
router.get('/dashboard', ensureAuthenticated, (req, res) => 
    res.render('dashboard', {
        email: req.user.email
    }));


module.exports = router;