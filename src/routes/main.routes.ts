import { Router } from "express";

import multer from "multer";

import { sendEmailController } from "../useCases";

const mainRoute = Router();

const upload = multer({
    dest: "./tmp",
});

mainRoute.post("/test", (request, response) => {
    return response.json({ message: "working" });
});

mainRoute.post("/", upload.single("file"), (request, response) => {
    return sendEmailController.handle(request, response);
});

export { mainRoute };
