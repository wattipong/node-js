const passport = require('passport');
const passportJWT = require('passport-jwt');
const UserModel = require('../models/user.model');
const dotenv = require('dotenv');

dotenv.config();

const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const params = {
    secretOrKey: process.env.TOKEN_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

module.exports = () => {

    const strategy = new Strategy(params, async (payload, done) => {
        const user = await userModel.findOne({ where: { id: payload.id } });

        if (!user) { return done(new Error("User not Found"), null); }
        return done(null, user);

    });
    passport.use(strategy);
    return {
        initailize: () => {
            return passport.initialize();
        },
        authenticate: () => {
            return passport.authenticate("jwt", { session: false });
        }
    }




}