import jwt from "jsonwebtoken";
import User from "../model/userschema.js";

const verifyTokenMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        ok: false,
        message: "You are not login, Please login",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "You are not login, Please login",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: "You are not login, Please login",
    });
  }
};

export default verifyTokenMiddleware;
