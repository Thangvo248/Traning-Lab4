import sql from "../lib/dbconfig";

//User object constructor
const User = function (user) {
  this.id = user.id;
  this.firstName = user.firstName;
  this.middleName = user.middleName;
  this.lastName = user.lastName;
  this.mobile = user.mobile;
  this.email = user.email;
  this.passwordHash = user.passwordHash;
  this.registeredAt = new Date();
  this.lastLogin = user.lastLogin;
  this.intro = user.intro;
  this.profile = user.profile;
};
User.createUser = async function createUser(newUser) {
  try {
    let result = await sql.promise().query("INSERT INTO user set ?", [newUser]);
    return result[0];
  } catch (err) {
    throw err;
  }
};
User.getAllUser = async function getAllUser() {
  try {
    let result = await sql.promise().query("SELECT * FROM user");
    return result[0];
  } catch (err) {
    throw err;
  }
};
User.getUserById = async function getUserById(UserId) {
  try {
    let result = await sql
      .promise()
      .query("SELECT * FROM user WHERE id = ?", [UserId]);
    return result[0];
  } catch (err) {
    throw err;
  }
};
User.signin = async function signin(email, password) {
  try {
    let result = await sql
      .promise()
      .query("SELECT id FROM user WHERE email = ? and passwordHash = ?", [
        email,
        password,
      ]);
    return result[0];
  } catch (err) {
    throw err;
  }
};

User.updateById = async function updateById(id, user) {
  try {
    let result = await sql
      .promise()
      .query(
        "UPDATE user SET firstName = ?, middleName = ?, lastName = ?, mobile = ?, email = ?, passwordHash = ?, intro = ?, profile = ? WHERE id = ?",
        [
          user.firstName,
          user.middleName,
          user.lastName,
          user.mobile,
          user.email,
          user.passwordHash,
          user.intro,
          user.profile,
          id,
        ]
      );
    return result[0];
  } catch (err) {
    throw err;
  }
};
User.remove = async function remove(id) {
  try {
    let result = await sql
      .promise()
      .query("DELETE FROM user WHERE id = ?", [id]);
    return result[0];
  } catch (err) {
    throw err;
  }
};
export default User;
