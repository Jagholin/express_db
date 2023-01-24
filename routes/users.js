import { Router } from "express";
import { getUsers, getUser, postUser, putUser, deleteUser, getUserOrders } from "../controllers/users.js";
import { body } from "express-validator";

const route = new Router();

route.get("/", getUsers);
route.get("/:id", getUser);
route.post("/", body("firstName").isString(), body("lastName").isString(), body("age").isInt({gt: 0, lt: 100}), postUser);
route.put("/:id", body("firstName").isString(), body("lastName").isString(), body("age").isInt({gt: 0, lt: 100}), putUser);
route.delete("/:id", deleteUser);
route.get("/:id/orders", getUserOrders);

export default route;