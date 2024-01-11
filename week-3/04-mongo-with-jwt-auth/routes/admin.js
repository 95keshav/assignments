const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const zod = require("zod");
const router = Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { Admin, Course } = require("../db");
const validateAdminCred = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const validateCourse = zod.object({
  title: zod.string(),
  description: zod.string(),
  price: zod.number(),
  imageLink: zod.string().url(),
});

// Admin Routes
router.post("/signup", (req, res) => {
  const validUser = validateAdminCred.safeParse({
    username: req.body.username,
    password: req.body.password,
  });

  if (!validUser.success) return res.status(403).json({ msg: validUser });

  try {
    Admin.create({
      username: validUser.data.username,
      password: validUser.data.password,
    });
    return res.status(200).json({ message: "Admin created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.post("/signin", async (req, res) => {
  const validUser = validateAdminCred.safeParse({
    username: req.body.username,
    password: req.body.password,
  });

  if (!validUser.success)
    return res.status(403).json({ msg: "username or password is not valid" });

  const user = await Admin.findOne({
    username: validUser.data.username,
  }).exec();

  if (!user) {
    return res.status(404).json({ msg: "Admin not found" });
  }

  const token = jwt.sign(validUser.data.username, JWT_SECRET);
  return res.status(200).json({ token: token });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  const coursePayload = validateCourse.safeParse({
    title: req.body?.title,
    description: req.body?.description,
    price: req.body?.price,
    imageLink: req.body?.imageLink,
  });

  //check is payload is valid
  if (!coursePayload.success)
    return res.status(403).json({ msg: "Course Content is not valid" });

  try {
    const newCourse = await Course.create({
      title: coursePayload.data?.title,
      description: coursePayload.data?.description,
      price: coursePayload.data?.price,
      imageLink: coursePayload.data?.imageLink,
    });
    return res.status(200).json({
      message: "Course created successfully",
      courseId: newCourse._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server error" });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  try {
    const courses = await Course.find();
    return res.status(200).json(courses);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server error" });
  }
});

module.exports = router;
