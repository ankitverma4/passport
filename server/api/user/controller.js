import User from '../../models/user';
import { Response } from '../../helper/response';

class UserController {
    async saveUser(req, res, next) {
        let newUser = new User(req.body);
        console.log(newUser, "new user");
        
        newUser.setPassword(1234);
        await newUser.save();
        // let newUser = await User.create(req.body);
        return res.send( new Response(newUser, "User registered successfully.", 200));
    }

    async login(req, res, next) {
        let user = await User.findOne({userName: req.body.userName});
        console.log(user.checkPassword(req.body.password), "check pass");
        console.log(user.toAuthResponse(), "auth response");
        
        if(user.checkPassword(req.body.password)) {
            return res.send(new Response(user.toAuthResponse(), "Login success.", 200));
        } else {
            return res.send(new Response({}, "Incorrect username", 400));
        }
    }
}


export default new UserController();