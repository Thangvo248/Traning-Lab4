import Category from "../models/categoryModel";
import { StatusCodes } from "http-status-codes";

class CategoryController {
  static getAllCategories = async (req, res) => {
    const result = await Category.getAllCategories();
    return res.status(StatusCodes.OK).json({
      mgs: "Create category successfully",
      data: result,
    });
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

export default CategoryController;
