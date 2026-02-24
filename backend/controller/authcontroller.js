import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/userschema.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, image } = req.body;

    if (!name || !email || !password || !image) {
      return res.status(400).json({
        ok: false,
        message: "Please fill all fields",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name,
      image: image,
      email: email,
      password: hashedPassword,
    });

    return res.status(201).json({
      ok: true,
      message: "Account registered successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        message: "Please provide email and password",
      });
    }

    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(404).json({
        ok: false,
        message: "Email not found, please register",
      });
    }

    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      return res.status(401).json({
        ok: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: findUser._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
      })
      .status(200)
      .json({
        ok: true,
        message: "Login successful",
      });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({
    ok: true,
    message: "Logout successfully",
  });
};

export const getacount = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "You are not login, Please login",
      });
    }

    res.status(200).json({
      ok: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};
