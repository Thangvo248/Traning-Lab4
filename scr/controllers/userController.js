import User from "../models/userModel";
import { StatusCodes } from "http-status-codes";
import jsonData from "../helpers/helper";
import { signAccessToken } from "../middleware/authJWT";
import client from "../helpers/connectRedis";
import { validationResult } from "express-validator";
import { signUpValidate } from "../middleware/JoiValidator";
const INDEX_ROW = 0;

class UserController {
  static getUsers = async (req, res) => {
    try {
      const users = await User.getAllUser();
      return res.status(StatusCodes.OK).send(users);
    } catch (err) {
      console.log("getUsers error", err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server error");
    }
  };
  static addUser = async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res
    //     .status(StatusCodes.BAD_REQUEST)
    //     .json({ success: false, errors: errors.array() });
    // }
    const { error } = signUpValidate(req.body);
    if (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, errors: error.details[0].message });
    }
    try {
      const { email, passwordHash } = req.body;
      if (!email || !passwordHash) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send("Email/password not found!");
      }
      const newUser = new User(req.body);
      //await User.createUser(newUser);
      return res.status(StatusCodes.CREATED).send("Create user successfully");
    } catch (error) {
      console.log("adduser error", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(jsonData("Server error"));
    }
  };
  static signin = async (req, res) => {
    try {
      const { email, passwordHash } = req.body;
      if (!email || !passwordHash) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send("Email/password not found!");
      }
      const result = await User.signin(email, passwordHash);
      const userId = result[INDEX_ROW].id;

      if (userId) {
        const accessToken = await signAccessToken(userId);
        return res.json({ accessToken });
        //return res.status(StatusCodes.OK).send("login user successfully");
      }
      res.status(StatusCodes.BAD_REQUEST).send("Signin faill!");
    } catch (err) {
      console.log("signin error", err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server error");
    }
  };
  static signout = async (req, res) => {
    try {
      const { user_id } = req.payload;
      console.log("sigout id user", user_id);
      client.del(user_id, function (err, reply) {
        console.log(reply); // 1
      });
      return res.json({ message: "User Deleted!" });
    } catch (err) {
      console.log("sigout error", err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server error");
    }
  };
}
export default UserController;
