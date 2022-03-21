import Post from "../models/postModel";
import { StatusCodes } from "http-status-codes";

class PostController {
  static getAllCategories = (req, res) => {
    Category.getAllCategories();
  };
  static createCategory = async (req, res) => {
    const category = new Category(req.body);
    const newCategory = await Category.createCategory(category);
    return res
      .status(StatusCodes.OK)
      .json({ mgs: "Create category successfully", data: newCategory });
  };
  static updateCategory = async (req, res) => {
    const category = new Category(req.body);
    const newCategory = await Category.updateById(category.id, category);
    return res
      .status(StatusCodes.OK)
      .json({ mgs: "Update category successfully", data: newCategory });
  };
  static deleteCategory = async (req, res) => {
    const { categoryId } = req.body;
    await Category.remove(categoryId);
    return res
      .status(StatusCodes.OK)
      .json({ mgs: "Delete category successfully" });
  };
}

export default PostController;
