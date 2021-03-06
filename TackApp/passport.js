// http://passportjs.org/guide/twitter/
var TWITTER_CONSUMER_KEY = '94YZevynJavcNqEqVsOhqFrxl';
var TWITTER_CONSUMER_SECRET = 'aIkvqbT7vsIWsFj5anGo8d2d8Z0tm2uiSu5R9LeyeGkZZ2QC9x';
var passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy;

// Sessionの設定
// http://passportjs.org/guide/configure/
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://localhost:3000/api/loginFinish"
  },
  function(token, tokenSecret, profile, done) {
    passport.session.id = profile.id;

    // tokenとtoken_secretをセット
    profile.twitter_token = token;
    profile.twitter_token_secret = tokenSecret;

    process.nextTick(function () {
        return done(null, profile);
    });
  }
));

module.exports = {passport: passport};