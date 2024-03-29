const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user)
    })
})

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true
}, async (accessToken, refreshToken, profile, done) => {
   const existingUser = await User.findOne({ googleId: profile.id })

   if (existingUser) {
      // already have a record with the given profile ID
      return done(null, existingUser)
  }
    // new user, make new record
    const user = await new User({ googleId: profile.id }).save()
    done(null, user)
  })
)

// Use below for facebook strategy

// passport.use(new FacebookStrategy({
//   clientID: keys.facebookClientID,
//   clientSecret: keys.facebookClientSecret,
//   callbackURL: '/auth/facebook/callback',
//   proxy: true,
//   profileFields: ['id', 'email', 'name']
// }, (accessToken, refreshToken, profile, done) => {
//   User.findOne({ facebookId: profile.id })
//     .then((existingUser) => { existingUser ? done(null, existingUser) : new User({ facebookId: profile.id }).save()
//     .then(user => done(null, user)) 
//     })
//   })
// )
