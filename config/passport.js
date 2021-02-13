//** Import passport and bcrypt so DB can authenticate */
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

//** Load the User model */
const User = require('../models/User');


//** Export all the passport logic */
module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {

      //** Match User email */
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        //** Match User password */
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );
//** serialize in order for cookies to identify or support login session  */
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};

//** don't forget to put ->> app.use(passport.initialize());
//** and app.use(passport.session()); 
//** in app.js so this WORKS! note: AFTER express session middleware code */