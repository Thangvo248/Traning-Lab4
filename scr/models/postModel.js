import * as sql from "../lib/dbconfig";

const Post = function (post) {
  this.id = post.id;
  this.authorId = post.authorId;
  this.parentId = post.parentId;
  this.title = post.title;
  this.metaTitle = post.metaTitle;
  this.slug = post.slug;
  this.summary = post.summary;
  this.published = post.published;
  this.content = post.content;
};
Post.createpost = async function createPost(newpost) {
  try {
    let result = await sql.promise().query("INSERT INTO post set ?", [newpost]);
    return result[0].insertId;
  } catch (err) {
    throw err;
  }
};
Post.updateById = async function updateById(id, post) {
  try {
    let result = await sql
      .promise()
      .query(
        "UPDATE post SET authorId = ? ,title = ?, metaTitle = ?, slug = ?, published = ? summary = ?, content = ? WHERE id = ?",
        [
          post.authorId,
          post.title,
          post.metaTitle,
          post.slug,
          post.summary,
          post.published,
          post.content,
          id,
        ]
      );
    return result[0];
  } catch (err) {
    throw err;
  }
};
Post.getById = async function getById(id) {
  try {
    let result = await sql
      .promise()
      .query("SELECT * FROM post WHERE id = ?", [id]);
    return result[0];
  } catch (err) {
    throw err;
  }
};
Post.getAllPosts = async function getAllCategories() {
  try {
    let result = await sql.promise().query("SELECT * FROM post");
    return result[0];
  } catch (err) {
    throw err;
  }
};
Post.remove = async function remove(id) {
  try {
    let result = await sql
      .promise()
      .query("DELETE FROM post WHERE id = ?", [id]);
    return result;
  } catch (err) {
    throw err;
  }
};
export default Post;
