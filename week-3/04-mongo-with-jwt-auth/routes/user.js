const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User, Course } = require("../db");
const { JWT_SECRET } = require("../config");
const { default: mongoose } = require("mongoose");
const validateUserCred = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const validateCourse = zod.object({
  title: zod.string(),
  description: zod.string(),
  price: zod.number(),
  imageLink: zod.string().url(),
});

// User Routes
router.post("/signup", async (req, res) => {
  const validUser = validateUserCred.safeParse({
    username: req.body.username,
    password: req.body.password,
  });

  if (!validUser.success)
    return res.status(403).json({ message: "Course Content Not Valid" });

  try {
    await User.create({
      username: validUser.data?.username,
      password: validUser.data?.password,
    });

    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/signin", async (req, res) => {
  const validUser = validateUserCred.safeParse({
    username: req.body.username,
    password: req.body.password,
  });

  if (!validUser.success)
    return res.status(403).json({ message: "Course Content Not Valid" });

  try {
    const user = await User.findOne({
      username: validUser.data.username,
    }).exec();

    if (user === null)
      return res.status(404).json({ message: "User not found" });

    const token = jwt.sign(user.username, JWT_SECRET);
    return res.status(200).json({ token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find().exec();
    return res.status(200).json([...courses]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server Error" });
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const courseId = req.params?.courseId;
  if (!courseId) return res.json({ message: "courseId not given" });

  try {
    const auth = req.headers.autherization;
    const token = auth.split(" ");
    const decodeUser = jwt.decode(token[1]);
    await User.updateOne({
      username: decodeUser,
      $push: {
        purchasedCourses: new mongoose.Types.ObjectId(courseId),
      },
    });
    return res.status(200).json({ message: "Course purchased successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: decodeUser });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  try {
    const auth = req.headers.autherization;
    const token = auth.split(" ");
    const decodeUser = jwt.decode(token[1]);
    const user = await User.findOne({ username: decodeUser })
      .populate({
        path: "purchasedCourses",
      })
      .exec();
    return res.status(200).json(user.purchasedCourses);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
});

module.exports = router;
