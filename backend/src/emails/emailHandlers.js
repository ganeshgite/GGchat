import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailTempletes.js"


export const sendWelcomeEmail = async (email,name,clientURL)=>{ 
    const {data,error} = await resendClient.emails.send({
        from:`${sender.name} <${sender.email}>`,
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

export const sendOTPEmail = async (email, otp) => {

  try { 

    await resendClient.emails.send({

      from:`${sender.name} <${sender.email}>` ,

      to: email,

      subject: "Verify Your Account To GGchat",

      html: `
        <div style="font-family:sans-serif">

          <h2>Email Verification</h2>

          <p>Your OTP code is:</p>

          <h1>${otp}</h1>

          <p>
            This OTP will expire in 5 minutes.
          </p>

        </div>
      `,
    });
    

  } catch (error) {

    console.log("OTP email error", error);

    throw error;
  }
};