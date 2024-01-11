const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function userMiddleware(req, res, next) {
  const auth = req.headers?.autherization;
  if (auth === undefined)
    return res.status(403).json({ msg: "Autherization token is not present" });

  try {
    const token = auth.split(" ");
    const decodedValue = jwt.verify(token[1], JWT_SECRET);
    if (decodedValue) {
      next();
    } else {
      return res.status(403).json({ msg: "not autherized" });
    }
  } catch (error) {
    console.log(error);
    return res.status(403).json({ msg: "Incorrect Inputs" });
  }
}

module.exports = userMiddleware;
