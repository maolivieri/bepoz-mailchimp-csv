import { Response, Request } from "express";

import { SendEmailUseCase } from "./SendEmailUseCase";

class SendEmailController {
    constructor(private sendEmailUseCase: SendEmailUseCase) {}

    handle(request: Request, response: Response): Response {
        const { file } = request;

        try {
            this.sendEmailUseCase.execute(file);
            return response.send();
        } catch (error) {
            return response
                .status(400)
                .json({ message: "alguma coisa deu errado" });
        }
    }
}

export { SendEmailController };
