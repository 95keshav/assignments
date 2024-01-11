const { Admin } = require("../db");
const zod = require("zod");

// Middleware for handling auth
function adminMiddleware(req, res, next) {
  // Implement admin auth
  const validUser = zod.object({
    username: zod.string().email(),
    password: zod.string(),
  });

  const userPayload = validUser.safeParse({
    username: req.headers?.username,
    password: req.headers?.password,
  });

  if (!userPayload.success)
    return res.status(403).json({ msg: "username or password is not valid" });

  //   check user exists
  Admin.findOne({
    username: userPayload.data.username,
    password: userPayload.data.password,
  }).then((value) => {
    if (value) {
      next();
    } else {
      res.status(404).json({ msg: "Admin not found" });
    }
  });
}

module.exports = adminMiddleware;
