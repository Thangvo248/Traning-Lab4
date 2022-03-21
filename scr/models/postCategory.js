import * as sql from ("../lib/dbconfig");

const Post = function (Post) {
  this.id = Post.id;
  this.authorId = Post.authorId;
  this.parentId = Post.parentId
  this.title = Post.title;
  this.metaTitle = Post.metaTitle;
  this.slug= Post.slug;
  this.summary = Post.summary;
  this.published= Post.published;
  this.createdAt = new Date();
  this.content = Post.content;
  this.updateAt = Post.updateAt;
  this.publishedAt = Post.publishedAt;
};
Post.createPost = async function createPost(newPost) {
  try {
    let result = await sql
      .promise()
      .query("INSERT INTO post set ?", [newPost]);
      return result[0];
  } catch (err) {
    throw err;
  }
};
Post.updateById = function updateById(id, Post) {
  try {
    let result = await sql
      .promise()
      .query(
        "UPDATE post SET metaTitle = ?, slug = ?, summary = ?, published = ?, content = ? WHERE id = ?",
        [
            Post.title,
          Post.metaTitle,
          Post.slug,
          Post.summary,
          Post.published,
          Post.content,
          id,
        ]
      );
    return result[0];
  } catch (err) {
    throw err;
  }
};
Post.getById = function getById(id) {
  try {
    let result = await sql
      .promise()
      .query("SELECT * FROM Post WHERE id = ?", [id]);
    return result[0];
  } catch (err) {
    throw err;
  }
};
Post.getAllCategories = function getAllCategories() {
  try {
    let result = await sql.promise().query("SELECT * FROM Post");
    return result[0];
  } catch (err) {
    throw err;
  }
};
User.remove = function remove(id) {
  try {
    let result = await sql
      .promise()
      .query("DELETE FROM Post WHERE id = ?", [id]);
    return result[0];
  } catch (err) {
    throw err;
  }
};
export default Post;
