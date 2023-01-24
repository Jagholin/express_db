import { Router } from "express";
import { getUsers, getUser, postUser, putUser, deleteUser } from "../controllers/users.js";

const route = new Router();

route.get("/", getUsers);
route.get("/:id", getUser);
route.post("/", postUser);
route.put("/:id", putUser);
route.delete("/:id", deleteUser);

export default route;