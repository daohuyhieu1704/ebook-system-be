class AccessController {
  signUp = async (req, res, next) => {
    try {
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
  signIn = async (req, res, next) => {
    try {
      var body = JSON.parse(req.body);
      const username = body.username.replace(/[;'"-]/g, "");
      const pw = body.password.replace(/[;'"-]/g, "");
      const passwordHashed = saltedSha256(pw, env.SALT_PASSWORD);
      connection.query(
        "SELECT username,hoten,email,role FROM user_admin where username = '" +
          username +
          "' and password = '" +
          passwordHashed +
          "'",
        (err, resRows) => {
          if (err) throw err;
          if (resRows.length == 0) {
            res.json({
              state: false,
              message: "Sai thông tin đăng nhập",
            });
          } else {
            const dataRow = mylib.parseToJSONFrDB(resRows)[0];
            const actNew = mylib.generAccessTokenEmp(
              username,
              passwordHashed,
              dataRow.role
            );

            res.json({
              state: true,
              message: "Đăng nhập thành công.",
              fullname: dataRow.fullname,
              access_token: actNew,
              role: parseInt(dataRow.role),
            });
          }
        }
      );
    } catch (e) {
      next(error);
    }
  };
}

module.exports = new AccessController();
