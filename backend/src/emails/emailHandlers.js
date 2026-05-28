import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailTempletes.js"


export const sendWelcomeEmail = async (email,name,clientURL)=>{ 
    const {data,error} = await resendClient.emails.send({
        from:`${sender.name} <${sender.email}> `,
        to:email,
        subject: "Wellcome To The GGchat..!",
        html: createWelcomeEmailTemplate(name,clientURL),
    });
    if(error)
    {
        console.error("Error Sending WellCome Email");
        throw new Error("Failed to Send Wellcome Email")
    }
    console.log("welcome Email send successfully")
} 