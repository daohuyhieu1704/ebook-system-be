import TemplateService from "../services/template.service.js";
import HttpResponse from "../utils/HttpResponse.js";
import UserService from "../services/user.service.js";

class EmailController {
  newTemplate = async (req, res, next) => {
    try {
      const { tem_name } = JSON.parse(req.body);
      let data = await new TemplateService().newTemplate({ tem_name });

      if (data.error) {
        return res.status(400).json(HttpResponse.error(data.error));
      }
      return res.json(HttpResponse.success(data));
    } catch (error) {
      return res.status(400).json(HttpResponse.error(error));
    }
  };
}

export default EmailController;
