const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require("../models/user.model");
const dotenv = require('dotenv');

dotenv.config();

const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
    secretOrKey: process.env.TOKEN_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = () => {
    const strategy = new Strategy(params, async (payload, done) => {
        const user = await User.findOne({where:{id:payload.id}});

        if (!user) return done(new Error("User not found "), null);
    
        return done(null, user);
    });

    passport.use(strategy);

    return {
        initialize: () => {
            return passport.initialize();
        },
        authenticate: () => {
            return passport.authenticate("jwt", { session: false });
        }
    };
};