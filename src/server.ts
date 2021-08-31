import express from "express";
import { mainRoute } from "./routes/main.routes";

const app = express();
app.use(express.json());

app.use("/send", mainRoute);

app.listen(3333, () => console.log("The server is running!   =)"));
