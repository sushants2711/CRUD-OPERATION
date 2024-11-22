import express from "express"
import { create, fetch, update , deleteuser} from "../controller/userController.js"

const route = express.Router()

route.get("/fetchalluser", fetch)
route.post("/create", create)
route.put("/update/:email", update)
route.delete("/delete/:email", deleteuser)



export default route;   