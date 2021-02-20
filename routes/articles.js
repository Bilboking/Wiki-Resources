const express = require('express');
const Article = require('./../models/article') //?? May not need two dots */ 
const router = express.Router();

//** all-articles page */
router.get('/all-articles', (req, res) => {
    res.render('all-articles')
});

router.get('/create', (req, res) => {
    res.render('create')
})

router.post('/', async (req, res) => {
    const article = new Article({
        title: req.body.title,
        content: req.body.content
    })
    await article.save()
})

module.exports = router;