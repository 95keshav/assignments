const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

// Middleware for handling auth
function adminMiddleware(req, res, next) {
  const auth = req.headers?.autherization;
  if (auth === undefined)
    return res.status(403).json({ msg: "a not autherized" });

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

module.exports = adminMiddleware;
