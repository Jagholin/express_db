import "dotenv/config";
import express from "express";
import userRoute from "./routes/users.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/users", userRoute);

app.listen(3000, () => {
    console.log("Server started");
})

