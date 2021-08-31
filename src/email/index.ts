import axios from "axios";

const sendEmailFunction = (
    email: string,
    acc_id: string,
    acc_number: string
): void => {
    const API_KEY = "zFv7k14uhApoL7L5F262Uw";
    const baseURL = "https://mandrillapp.com/api/1.0/messages/send-template";

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const requestBody = {
        key: "zFv7k14uhApoL7L5F262Uw",
        message: {
            from_email: "test@vecport.net",
            from_name: "TESTING",
            subject: "Hello world",
            to: [
                {
                    email: email,
                    type: "to",
                },
            ],
            global_merge_vars: [
                {
                    name: "ACCID",
                    content: acc_id,
                },
                {
                    name: "ACCNUMBER",
                    content: acc_number,
                },
            ],
        },
        template_name: "99-resend-membership-details",
        template_content: [{}],
    };
    axios
        .post(baseURL, JSON.stringify(requestBody), config)
        .then()
        .catch((err) => console.log("Something went wrong"));
};

export { sendEmailFunction };
