import HttpResponse from '../utils/HttpResponse.js'
import AuthenService from "../services/authen.service.js";
class AuthenController {

    postLogin = async (req, res, next) => {

        const { email, password } = JSON.parse(req.body);
        return res.json(HttpResponse.success(await new AuthenService().LogIn({ email, password })));
    }

    postRefreshToken = async (req, res, next) => {

        const { refreshToken } = JSON.parse(req.body);
        return res.json(HttpResponse.success(await new AuthenService().RefreshToken({ refreshToken })));
    }
    
}

export default AuthenController;