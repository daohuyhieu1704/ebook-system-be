import HttpResponse from '../utils/HttpResponse.js'
import UserService from "../services/user.service.js";
class UserController {

    postSignUp = async (req, res, next) => {
        const { fullName ,email, password } = JSON.parse(req.body);
        return res.json(HttpResponse.success(await new UserService().SignUp({ fullName ,email, password })));
    }
    
}

export default UserController;