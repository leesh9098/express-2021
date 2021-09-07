import express from "express";
import user_router from "./route/users";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", user_router);

app.listen(3001);