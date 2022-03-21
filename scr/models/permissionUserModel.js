import sql from "../lib/dbconfig";

const PermissionUser = function (PermissionUser) {
  this.user_id = PermissionUser.user_id;
  this.permission_id = PermissionUser.permission_id;
};
PermissionUser.Getpermission = async function (userId) {
  try {
    let result = await sql
      .promise()
      .query(
        "SELECT resource,action FROM user_permission, permission WHERE user_permission.user_id = ?  and user_permission.permission_id = permission.id ",
        [userId]
      );
    return result;
  } catch (err) {
    throw err;
  }
};
PermissionUser.AddPermisson = async function (permissionUser) {
  try {
    let result = await sql
      .promise()
      .query("INSERT INTO user_permission set ?", [permissionUser]);
    return result;
  } catch (err) {
    throw err;
  }
};
PermissionUser.CheckPermission = async function (userId, permissionId) {
  try {
    let result = await sql
      .promise()
      .query(
        "SELECT * FROM blog.user_permission WHERE user_id = ? and permission_id = ? ",
        [userId, permissionId]
      );
    return result[0];
  } catch (err) {
    throw err;
  }
};
PermissionUser.RemovePermission = async function RemovePermission(userId) {
  try {
    let result = await sql
      .promise()
      .query("DELETE FROM blog.user_permission WHERE id = ?", [userId]);
    return result;
  } catch (err) {
    throw err;
  }
};
export default PermissionUser;
