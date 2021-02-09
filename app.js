const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();

//** dotenv DB connect */
require('dotenv').config();
mongoose.connect(process.env.DB_URI,  {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
    .then( (res) => console.log('db connected'))
    .catch((err) => console.log(err));

//** EJS */
app.use(expressLayouts);
app.set('view engine', 'ejs')

//** allow stylesheet access to ejs files */
app.use(express.static(__dirname + '/public'));

//** routes */
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));