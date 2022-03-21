import userController from "../controllers/userController";
import PermissionUserController from "../controllers/permissionUserController";
import express from "express";
import { checkPermission } from "../middleware/checkPemisson";
import { verifyAccessToken } from "../middleware/authJWT";
import {
  validateRegisterUser,
  validateSign,
} from "../middleware/expressValidator";
const routes = express.Router();

routes.get(
  "/get-users",
  verifyAccessToken,
  checkPermission("category", "GET"),
  userController.getUsers
);
routes.post(
  "/addUser",
  verifyAccessToken,
  checkPermission("category", "POST"),
  userController.addUser
);
routes.post("/signin", userController.signin);
routes.put("/addpermisson", PermissionUserController.addpermisson);
routes.get("/signout", verifyAccessToken, userController.signout);
routes.delete(
  "/remove-premisson",
  verifyAccessToken,
  PermissionUserController.removePermisson
);
export default routes;
