const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

//** Passport config */
require('./config/passport')(passport);

//** dotenv and mongoose mongoDB connect */
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

//** Express Bodyparser */
app.use(express.urlencoded({ extended: true }));

//** Express session */
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

//** Passport middleware initializes local strategy */
app.use(passport.initialize());
app.use(passport.session());

//** Connect Flash */
app.use(flash());

//** Global variables for Flash messages */
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//** Allow stylesheet access to ejs files */
app.use(express.static(__dirname + '/public'));

//** routes */
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));