import HttpResponse from '../utils/HttpResponse.js'
import InitService from "../services/Init.service.js";
class InitController {

    postFunc = async (req, res, next) => {
        const { data } = JSON.parse(req.body);
        return res.json(HttpResponse.success(await new InitService().InitFunc({ data })));
    }
    
}

export default InitController;