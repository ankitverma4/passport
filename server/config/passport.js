import {Strategy, ExtractJwt} from 'passport-jwt';
import User from '../models/user';
import Boom from '@hapi/boom';
import Passport from 'passport';

let strategy = new Strategy(
    {
        secretOrKey: 'secret',
        jwtFromRequest: ExtractJwt.fromHeader('token')
    },
    async (payload, cb) => {
        console.log("inside p[assport");
        
        let userName = payload.userName;
        let user = await User.findOne({userName});
        if(!user) {
            return cb(Boom.unauthorized('Unauthorized access.'));
        }
        return cb(null, user);
    }
);

Passport.serializeUser((user, done) => {
    done(null, user);
});

Passport.deserializeUser((user, done) => {
    done(null, user);
});

const authenticate = () =>{
    console.log("inside passport authe");
    return Passport.authenticate('jwt', {session: false});
} 

module.exports = {
    authenticate, 
    strategy
}