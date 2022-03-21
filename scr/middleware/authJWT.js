import JWT from "jsonwebtoken";
import client from "../helpers/connectRedis";
import PermissionUser from "../models/permissionUserModel";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
const INDEX_ROW = 0;

const signAccessToken = async (userId) => {
  return new Promise(async (resolve, reject) => {
    const payload = {
      user_id: userId,
    };

    const result = await PermissionUser.Getpermission(userId);
    const listPermission = result[INDEX_ROW];
    let permission = new Object();

    _.forEach(listPermission, function (value) {
      const resource = value.resource;
      const action = value.action;
      permission[resource]
        ? permission[resource].push(action)
        : (permission[resource] = [action]);
      console.log("permission", permission);
    });
    payload.permission = permission;
    //console.log(payload);
    const { JWT_SECRET } = process.env;
    const options = {
      expiresIn: "1y",
    };
    JWT.sign(payload, JWT_SECRET, options, (err, token) => {
      if (err) reject(err);
      client.set(userId.toString(), token, "EX", 24 * 60 * 60);
      resolve(token);
    });
  });
};

const verifyAccessToken = async (req, res, next) => {
  try {
    console.log("Verifying access token");
    if (!req.headers["authorization"]) {
      return res.status(StatusCodes.UNAUTHORIZED).send("Not login");
    }
    const authHeader = req.headers["authorization"];
    const bearertoken = authHeader.split(" ");
    const token = bearertoken[1];
    const { JWT_SECRET } = process.env;
    JWT.verify(token, JWT_SECRET, (err, payload) => {
      if (err) {
        return err;
      }
      client.get(payload.user_id, (err, result) => {
        if (err) {
          return err;
        }
        if (result === token) {
          req.payload = payload;
          console.log("check redis true");
          next();
        } else {
          return res.status(StatusCodes.BAD_REQUEST).send("User not logins");
        }
      });
    });
  } catch (err) {
    return err;
  }
};
// const signRefreshToken = async (userId) => {
//   return new Promise(async (resolve, reject) => {
//     const payload = {
//       user_id: userId,
//     };
//     const result = await PermissionUser.Getpermission(userId);
//     payload.permission = result[0];
//     const { JWT_REFRESH_SECRET } = process.env;
//     const options = {
//       expiresIn: "1d",
//     };
//     JWT.sign(payload, JWT_REFRESH_SECRET, options, (err, token) => {
//       if (err) reject(err);
//       client.set(userId.toString(), token, "EX", 24 * 60 * 60);
//       resolve(token);
//     });
//   });
// };
// const verifyRefreshToken = async (token) => {
//   return new Promise((resolve, reject) => {
//     JWT.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, payload) => {
//       if (err) return reject(err);
//       resolve(payload);
//     });
//   });
// };

export { signAccessToken, verifyAccessToken };
