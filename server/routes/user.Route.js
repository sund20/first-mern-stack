{/*import express from "express";
import { create, getAllUsers, getUserById, update, deleteUser } from "../controller/usersController.js"; // ✅ Use correct file

const route = express.Router();

route.post("/user", create);
route.get("/users", getAllUsers);
route.get("/users/:id", getUserById);
route.put("/users/:id", update);
route.delete("/users/:id", deleteUser);
export default route;
*/}

import express from "express";
import {
  create,
  getAllUsers,
  getUserById,
  update,
  deleteUser
} from "../controller/usersController.js";

const route = express.Router();

route.post("/user", create);
route.get("/users", getAllUsers);
route.get("/user/:id", getUserById);
route.put("/user/:id", update);
route.delete("/user/:id", deleteUser); // ✅ This is what we need

export default route;
