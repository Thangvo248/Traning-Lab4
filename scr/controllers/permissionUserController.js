import PermissionUser from "../models/permissionUserModel";
import { StatusCodes } from "http-status-codes";
import jsonData from "../helpers/helper";
import User from "../models/userModel";
import client from "../helpers/connectRedis";
const INDEX_ROW = 0;

class PermissionUserController {
  getPermissionsByuserId = async (userId) => {
    try {
      const result = await PermissionUser.Getpermission(userId);
      // console.log(result[0]);
      //const temp = Object.create(result);
      return result[INDEX_ROW];
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server error");
    }
  };
  static addpermisson = async (req, res) => {
    try {
      const { user_id, permission_id } = req.body;
      const checkUser = await User.getUserById(user_id);
      if (!checkUser[INDEX_ROW]) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send("Bad Request: User not found");
      }
      const checkPermission = await PermissionUser.CheckPermission(
        user_id,
        permission_id
      );
      if (checkPermission[INDEX_ROW]) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send("Bad Request: permission already exist");
      }
      const newPermission = new PermissionUser(req.body);
      await PermissionUser.AddPermisson(newPermission);
      client.del(user_id, function (err, reply) {
        console.log(reply); // 1
      });
      return res.status(StatusCodes.OK).send("Update Permission successfully");
    } catch (err) {
      console.log("signin error", err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server error");
    }
  };
  static removePermisson = async (req, res) => {
    try {
      const { user_id, permission_id } = req.body;
      const checkUser = await User.getUserById(user_id);
      if (!checkUser[INDEX_ROW]) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send("Bad Request: User not found");
      }
      const checkPermission = await PermissionUser.CheckPermission(
        user_id,
        permission_id
      );
      if (checkPermission[INDEX_ROW]) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send("Bad Request: permission already exist");
      }
      await PermissionUser.RemovePermission(user_id);
      client.del(user_id, function (err, reply) {
        console.log(reply); // 1
      });
      return res.status(StatusCodes.OK).send("Update Permission successfully");
    } catch (err) {
      console.log("remove permisson error", err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server error");
    }
  };
}
export default PermissionUserController;
