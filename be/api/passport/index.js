const LocalStrategy = require('passport-local').Strategy;
const User = require("../../models/User")
const bcrypt = require('bcrypt')

exports.config = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.email)
  })

  passport.deserializeUser((email, done) => {
    const result = User.findOne({ email: email },(err, user) => {
      if (err) return console.log(err)
      done(null, user);
    })
  })

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, (email, password, done) => {
    const result = User.findOne({ email: email }, (err, user) => {
      if (err) return console.log(err)
      if (!user) {
        done(null, false, { message: "Check your E-Mail"});
      } else {
        console.log(user.password)
        console.log(password)
        if (bcrypt.compareSync(password, user.password)) {
          done(null, user)
        } else {
          done(null, false, { message: "Check your password"});
        }
      }
    })
  }))
}
