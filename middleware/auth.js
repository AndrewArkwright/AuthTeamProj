module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next() //if logged in, go to... next page?
      } else {
        res.redirect('/') //redirect to main page to sign up or log in
      }
    },
    ensureGuest: function (req, res, next) {
      if (!req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/dashboard')
      }
    },
  }
  