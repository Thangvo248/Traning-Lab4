import _ from "lodash";
import { StatusCodes } from "http-status-codes";

const checkPermission = (resource, action) => {
  return (req, res, next) => {
    let data = req.payload;
    const permission = data.permission;
    return permission?.[resource]?.includes(action)
      ? next()
      : res.status(StatusCodes.FORBIDDEN).json("No permission");
  };
};

export { checkPermission };
