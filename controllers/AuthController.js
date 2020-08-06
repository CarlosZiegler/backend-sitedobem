const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../jwtConfig')

module.exports = {
    // Create new User account
    async store(req, res, next) {
        if (req.user.hasOwnProperty('error')) {
            return res.json({ error: req.user.error })
        }
        return res.json({
            message: 'Signup successful',
            user: {
                _id: req.user._id,
                email: req.user.email,
                role: req.user.role,
                vacancies: req.user.vacancies,
            },
        });

    },

    // Signup user with email and password 
    async index(req, res, next) {
        passport.authenticate('login', async (err, user, info) => {
            try {
                if (err || !user) {
                    return res.json({ error: info });
                }
                req.login(user, { session: false }, async (error) => {
                    if (error) return next(error)
                    //We don't want to store the sensitive information such as the
                    //user password in the token so we pick only the email and id
                    const body = { _id: user._id, email: user.email, role: user.role, vacancies: req.user.vacancies, };
                    //Sign the JWT token and populate the payload with the user email and id
                    const token = jwt.sign({ user: body }, jwtSecret.secret);
                    //Send back the token to the user
                    return res.json({ token, user: body });
                });
            } catch (error) {
                return next(error);
            }
        })(req, res, next);
    }

}

