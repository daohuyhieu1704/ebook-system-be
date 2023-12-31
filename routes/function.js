const express = require("express");
const HttpResponse = require("./../core/utils/HttpResponse");
const func_router = express.Router();
const bodyParser = require("body-parser");
const mylib = require("../mylib");
const emp_inf = require("./module.function/function_inf");
const saltedSha256 = require("salted-sha256");
const env = require("../env.json");

func_router.use("/func_router", func_router);

func_router.use(bodyParser.raw({ inflate: true, type: "application/json" }));
func_router.use(bodyParser.json());

const connection = require("../dbconfig");

func_router.post("", async (req, res, next) => {
  let { authorization } = req.headers;
  const isAuthen = mylib.verifyAuthorizationEmp(
    authorization.replace("Bearer ", "")
  );
  if (!isAuthen.authState) {
    return res.status(401).json({
      error: true,
      message: "Unauthorize",
    });
  }
  let { icon, script } = JSON.parse(req.body);
  const id = parseInt(
    Math.floor(Math.random() * 100).toString() + Date.now().toString()
  );
  connection.query(
    `INSERT INTO function (id, icon, script, create_by) VALUES ('${id}','${icon}','${script}', '${isAuthen.data.username}')`,
    async (err, resIns) => {
      if (err) {
        next(err);
      } else {
        res.json(
          HttpResponse.created({
            id,
            icon,
            script,
            create_by: isAuthen.data.username,
          })
        );
      }
    }
  );
});

// get All function
func_router.get("", async (req, res, next) => {
  let { authorization } = req.headers;
  const isAuthen = mylib.verifyAuthorizationEmp(
    authorization.replace("Bearer ", "")
  );
  if (!isAuthen.authState) {
    return res.status(401).json({
      error: true,
      message: "Api yêu cầu quyền truy cập",
    });
  }

  connection.query(
    `SELECT id, icon, script, create_by
    FROM function`,
    async (err, resRows) => {
      if (err) {
        next(err);
      } else {
        res.json(HttpResponse.success(mylib.parseToJSONFrDB(resRows)));
      }
    }
  );
});

func_router.get("/:id", async (req, res, next) => {
  let { authorization } = req.headers;
  const isAuthen = mylib.verifyAuthorizationEmp(
    authorization.replace("Bearer ", "")
  );
  if (!isAuthen.authState) {
    return res.status(401).json({
      error: true,
      message: "Api yêu cầu quyền truy cập",
    });
  }

  console.log(req.params.id);
  connection.query(
    `SELECT id, icon, script, create_by 
    FROM function WHERE id = '${req.params.id}'`,
    async (err, resRows) => {
      if (err) {
        next(err);
      } else {
        if (resRows.length == 0) {
          res.json(
            HttpResponse.error({ error_message: "Không tìm thấy dữ liệu" })
          );
        } else {
          const { id, icon, script, create_by } =
            mylib.parseToJSONFrDB(resRows)[0];

          res.json(
            HttpResponse.success({
              id,
              icon,
              script,
              create_by,
            })
          );
        }
      }
    }
  );
});

func_router.put("/:id", async (req, res, next) => {
  try {
    let { authorization } = req.headers;
    const isAuthen = mylib.verifyAuthorizationEmp(
      authorization.replace("Bearer ", "")
    );
    if (!isAuthen.authState) {
      return res.status(401).json({
        error: true,
        message: "Api yêu cầu quyền truy cập",
      });
    }
    let { icon, script } = JSON.parse(req.body);
    connection.query(
      `UPDATE function SET icon='${icon}',script='${script}' WHERE id='${req.params.id}'`,
      async (err, resRows) => {
        if (err) {
          next(err);
        } else {
          if (resRows.changedRows == 0) {
            if (resRows.affectedRows == 0) {
              res.json(
                HttpResponse.error({ error_message: "Không tìm thấy dữ liệu" })
              );
            } else
              res.json(
                HttpResponse.error({
                  error_message: "Không thể cập nhật dữ liệu",
                })
              );
          } else {
            res.json(
              HttpResponse.updated({
                icon,
                script,
              })
            );
          }
        }
      }
    );
  } catch (error) {
    console.log(1);
    next(error);
  }
});

func_router.delete("/:id", async (req, res, next) => {
  try {
    let { authorization } = req.headers;
    const isAuthen = mylib.verifyAuthorizationEmp(
      authorization.replace("Bearer ", "")
    );
    if (!isAuthen.authState) {
      return res.status(401).json({
        error: true,
        message: "Api yêu cầu quyền truy cập",
      });
    }

    connection.query(
      `DELETE FROM function WHERE id='${req.params.id}'`,
      async (err, resRows) => {
        if (err) {
          next(err);
        } else {
          if (resRows.changedRows == 0) {
            if (resRows.affectedRows == 0) {
              res.json(
                HttpResponse.error({ error_message: "Không tìm thấy dữ liệu" })
              );
            } else
              res.json(
                HttpResponse.error({ error_message: "Không thể xóa dữ liệu" })
              );
          } else {
            res.json(HttpResponse.deleted());
          }
        }
      }
    );
  } catch (error) {
    console.log(1);
    next(error);
  }
});
module.exports = func_router;
