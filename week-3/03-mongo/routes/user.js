const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const zod = require("zod");
const { User, Course } = require("../db");
const { default: mongoose } = require("mongoose");

const varifyUser = (username, password) => {
  const validUser = zod.object({
    username: zod.string(),
    password: zod.string(),
  });

  const userPayload = validUser.safeParse({
    username: username,
    password: password,
  });

  if (!userPayload.success) return false;
  return userPayload;
};

// User Routes
router.post("/signup", async (req, res) => {
  // Input: { username: 'user', password: 'pass' }
  const user = varifyUser(req.body?.username, req.body?.password);
  if (!user.success)
    return res.status(403).json({ msg: "username or password is not valid" });

  try {
    //put user in DB
    await User.create({
      username: user.data.username,
      password: user.data.password,
    });
    //if succesfull
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.log("userPostRouteError", error);
  }
});

router.get("/courses", async (req, res) => {
  const courses = await Course.find();
  res.status(200).json([...courses]);
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const courseId = req.params.courseId;
  const username = req.headers.username;
  try {
    await User.updateOne(
      { username: username },
      {
        $push: { purchasedCourses: new mongoose.Types.ObjectId(courseId) },
      }
    );
    return res.status(200).json({ message: "Course purchased successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const username = req.headers.username;
  try {
    const user = await User.findOne({ username: username })
      .populate({ path: "purchasedCourses" })
      .exec();
    return res.status(200).json(user.purchasedCourses);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
});

module.exports = router;
