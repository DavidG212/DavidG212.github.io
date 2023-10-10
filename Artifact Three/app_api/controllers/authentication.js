const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

// require all fields be entered
const register = (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ "message": "All fields required" });
    }

    // initialize user name, email, and password with reqs
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.save((err) => {
        // if there is an error show status 400
        if (err) {
            res
                .status(400)
                .json(err);
        // else generate user token and show status 200
        } else {
            const token = user.generateJwt();
            res
                .status(200)
                .json({ token });
        }
    })
};

// require all fields be entered
const login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ "message": "All fields required" });
    }
    passport.authenticate('local', (err, user, info) => {
        // if there is an error show status 400
        if (err) {
            return res
                .status(404)
                .json(err);
        }
        // if user is auth generate user token and show status 200
        if (user) {
            const token = user.generateJwt();
            res
                .status(200)
                .json({ token });
        } else {
            res
                .status(401)
                .json(info);
        }
    })(req, res);
};

module.exports = {
    register,
    login
};