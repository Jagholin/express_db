import { Router } from "express";
import { deleteOrder, getOrder, getOrders, postOrder, putOrder } from "../controllers/orders.js";
import { body } from "express-validator";

const route = new Router();

route.route("/").get(getOrders).post(body("price").isNumeric(), body("date").isDate(), body("userId").isNumeric(), postOrder);
route.route("/:id").get(getOrder).put(body("price").isNumeric(), body("date").isDate(), body("userId").isNumeric(), putOrder).delete(deleteOrder);

export default route;