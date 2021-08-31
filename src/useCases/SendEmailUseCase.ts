import fs from "fs";
import csvParse from "csv-parse";

import { sendEmailFunction } from "../email";

interface IImportMemberDetails {
    email: string;
    accId: string;
    accNumber: string;
}

class SendEmailUseCase {
    loadUsers(file: Express.Multer.File): Promise<IImportMemberDetails[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const members: IImportMemberDetails[] = [];

            const parseFile = csvParse();

            stream.pipe(parseFile);

            parseFile
                .on("data", async (line) => {
                    const [email, accId, accNumber] = line;
                    members.push({
                        email,
                        accId,
                        accNumber,
                    });
                })
                .on("end", () => {
                    fs.promises.unlink(file.path);
                    resolve(members);
                })
                .on("error", (err) => {
                    reject(err);
                });
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        try {
            const categories = await this.loadUsers(file);

            // const sends = [];

            categories.map((member) => {
                const res = sendEmailFunction(
                    member.email,
                    member.accId,
                    member.accNumber
                );
                // sends.push(member);
            });
            // return sends;
        } catch (error) {
            throw new Error("something went wrong");
        }
    }
}

export { SendEmailUseCase };
