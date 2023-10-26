const express = require("express");
const emp_router = express.Router();
const bodyParser = require("body-parser");
const mylib = require("../mylib");
const emp_inf = require("./module.emp/emp_inf");
const saltedSha256 = require("salted-sha256");
const env = require("../env.json");

emp_router.use("/emp_inf", emp_inf);

emp_router.use(bodyParser.raw({ inflate: true, type: "application/json" }));
emp_router.use(bodyParser.json());

const connection = require("../dbconfig");

emp_router.post("/login", (req, res) => {
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
          console.log("Login role : " + dataRow.role);
          const actNew = mylib.generAccessTokenEmp(
            username,
            passwordHashed,
            dataRow.role
          );
          console.log(actNew);
          res.json({
            state: true,
            message: "Đăng nhập thành công.",
            fullname: dataRow.fullname,
            acess_token: actNew,
            role: parseInt(dataRow.role),
          });
        }
      }
    );
  } catch (error) {
    return res.json({
      state: false,
      message: "Error has occured",
    });
  }
});

emp_router.post("/register", async (req, res) => {
  try {
    let { authorization } = req.headers;
    const isAuthen = mylib.verifyAuthorizationEmp(authorization.split(" ")[1]);
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
    return res.json({
      state: false,
      message: "Error has occured",
    });
  }
});

module.exports = emp_router;
