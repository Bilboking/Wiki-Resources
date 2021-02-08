const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();

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