import { Router } from "express";
import userRouter from "./userRouter";
import postRouter from "./postRouter";
import categoryRouter from "./categoryRouter";

const routes = Router();

//routers
routes.use("/users", userRouter);
routes.use("/categorys", categoryRouter);
routes.use("/posts", postRouter);

export default routes;
