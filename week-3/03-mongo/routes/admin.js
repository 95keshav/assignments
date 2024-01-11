const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const zod = require("zod");
const { Admin, Course } = require("../db");
const router = Router();

const validUser = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const validCourse = zod.object({
  title: zod.string(),
  description: zod.string(),
  price: zod.number(),
  imageLink: zod.string().url(),
});

// Admin Routes
router.post("/signup", async (req, res) => {
  const userPayload = validUser.safeParse({
    username: req.body.username,
    password: req.body.password,
  });

  if (!userPayload.success)
    return res.status(403).json({ msg: "username or password is not valid" });
  try {
    // put user in DB
    await Admin.create({
      username: userPayload.data.username,
      password: userPayload.data.password,
    });
    // if all good
    res.status(200).json({ message: "Admin created successfully" });
  } catch (error) {
    console.log("AdminRouteError", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  const coursePayload = validCourse.safeParse({
    title: req.body?.title,
    description: req.body?.description,
    price: req.body?.price,
    imageLink: req.body?.imageLink,
  });

  if (!coursePayload.success)
    return res.status(403).json({ message: "Course is not valid" });

  try {
    const courseCreated = await Course.create({
      title: coursePayload.data.title,
      description: coursePayload.data.description,
      price: coursePayload.data.price,
      imageLink: coursePayload.data.imageLink,
    });
    return res.status(200).json({
      message: "Course created successfully",
      courseId: courseCreated._id,
    });
  } catch (error) {
    console.error("Error in getCourseRoute:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  try {
    const courses = await Course.find();
    res.json([...courses]);
  } catch (error) {
    console.log("getCourseRouteError", error);
    res.status(500).json("Internal Server Error");
  }
});

module.exports = router;
