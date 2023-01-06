module.exports = {
  isLogin: async (req, res, next) => {
    if (!req.session.user && req.url == "/") {
      req.flash("alertMessage", "Mohon maaf session anda telah habis");
      res.redirect("/");
      return;
    }
    next();
  },
  otoritas: async (req, res, next) => {
    var session = req.session.user;
    if (req.session.user === null || req.session.user === undefined) {
      req.flash("alertMessage", "Mohon maaf session anda telah habis");
      res.redirect("/");
    } else {
      if (session.otoritas === "user") {
        res.redirect("/dashboard");
      } else {
        next();
      }
    }
  },
};
