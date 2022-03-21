import categoryController from "../controllers/categoryController";
import express from "express";
import { checkPermission } from "../middleware/checkPemisson";
import { verifyAccessToken } from "../middleware/authJWT";
const routes = express.Router();

routes.get(
  "/get_AllCategoryr",
  verifyAccessToken,
  checkPermission("category", "GET"),
  categoryController.getAllCategories
);
routes.post(
  "/createCategory",
  verifyAccessToken,
  checkPermission("category", "POST"),
  categoryController.createCategory
);
routes.put(
  "/updateCategory",
  verifyAccessToken,
  checkPermission("category", "PUT"),
  categoryController.updateCategory
);
routes.delete("/deleteCategory", categoryController.deleteCategory);
export default routes;
