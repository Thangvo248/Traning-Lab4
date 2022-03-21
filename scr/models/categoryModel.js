import sql from "../lib/dbconfig";

const Category = function (category) {
  this.id = category.id;
  this.parentId = category.parentId;
  this.title = category.title;
  this.metaTitle = category.metaTitle;
  this.slug = category.slug;
  this.content = category.content;
};
Category.createCategory = async function createCategory(newCategory) {
  try {
    let result = await sql
      .promise()
      .query("INSERT INTO category set ?", [newCategory]);
    return result[0].insertId;
  } catch (err) {
    throw err;
  }
};
Category.updateById = async function updateById(id, category) {
  try {
    let result = await sql
      .promise()
      .query(
        "UPDATE category SET title = ?, metaTitle = ?, slug = ?, content = ? WHERE id = ?",
        [
          category.title,
          category.metaTitle,
          category.slug,
          category.content,
          id,
        ]
      );
    return result[0];
  } catch (err) {
    throw err;
  }
};
Category.getById = async function getById(id) {
  try {
    let result = await sql
      .promise()
      .query("SELECT * FROM category WHERE id = ?", [id]);
    return result[0];
  } catch (err) {
    throw err;
  }
};
Category.getAllCategories = async function getAllCategories() {
  try {
    let result = await sql.promise().query("SELECT * FROM category");
    return result[0];
  } catch (err) {
    throw err;
  }
};
Category.remove = async function remove(id) {
  try {
    let result = await sql
      .promise()
      .query("DELETE FROM category WHERE id = ?", [id]);
    return result;
  } catch (err) {
    throw err;
  }
};
export default Category;
