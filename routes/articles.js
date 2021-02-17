const express = require('express');
const router = express.Router();

//** all-articles page */
router.get('/all-articles', (req, res) => {
    res.render('all-articles')
});

router.get('/create', (req, res) => {
    res.render('create')
})

module.exports = router;