class AccessController {
  signUp = async (req, res, next) => {
    try {
      console.log("AccessController.signUp", req.body);
      let { authorization } = req.headers;
      const isAuthen = mylib.verifyAuthorizationEmp(
        authorization.split(" ")[1]
      );
      if (!isAuthen.authState) {
        return res.status(401).json({
          error: true,
          message: "Unauthorize",
        });
      }
      let { username, password, role, email, hoten } = JSON.parse(req.body);
      const passwordHashed = saltedSha256(password, env.SALT_PASSWORD);
      connection.query(
        `INSERT INTO user_admin VALUES ('${username}','${passwordHashed}','${hoten}','${email}','${role}', '1')`,
        async (err, resIns) => {
          if (err) throw err;
          res.json({
            error: false,
            message: "Success",
          });
        }
      );
    } catch (e) {
      next(error);
    }
  };
}

module.exports = new AccessController();
