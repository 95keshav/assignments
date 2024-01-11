const { User } = require("../db");
const zod = require("zod");

const validUser = zod.object({
  username: zod.string(),
  password: zod.string(),
});

function userMiddleware(req, res, next) {
  const userPayload = validUser.safeParse({
    username: req.headers?.username,
    password: req.headers?.password,
  });
  // Implement user auth logic
  if (!userPayload.success)
    return res.status(403).json({ msg: "username or password is not valid" });

  //   check user exists
  User.findOne({
    username: userPayload.data.username,
    password: userPayload.data.password,
  }).then((value) => {
    if (value) {
      next();
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  });
}

module.exports = userMiddleware;
