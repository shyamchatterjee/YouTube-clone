import User from "../model/userschema.js";

const registermiddleware = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser) {
      return next();
    }

    return res.status(409).json({
      ok: false,
      message: "Email already exists",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};
export default registermiddleware;
