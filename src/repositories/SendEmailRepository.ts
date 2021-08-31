class Member {
    email: string | undefined;
    accId: string | undefined;
    accNumber: string | undefined;
}

interface ISendEmailDTO {
    email: string;
    accId: string;
    accNumber: string;
}

interface ISendEmailRepository {}

class SendEmailRepository implements ISendEmailRepository {
    private members: Member[];

    private static INSTANCE: SendEmailRepository;

    constructor() {
        this.members = [];
    }

    public static getInstance(): SendEmailRepository {
        if (!SendEmailRepository.INSTANCE) {
            SendEmailRepository.INSTANCE = new SendEmailRepository();
        }
        return SendEmailRepository.INSTANCE;
    }
}

export { SendEmailRepository };
