import { Router } from "express";
import { deleteOrder, getOrder, getOrders, postOrder, putOrder } from "../controllers/orders.js";

const route = new Router();

route.route("/").get(getOrders).post(postOrder);
route.route("/:id").get(getOrder).put(putOrder).delete(deleteOrder);

export default route;