import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const { EMAIL, EMAIL_PASSWORD } = process.env;


// export const sendEmail = async ({ to, subject, html, text })=>{
   
//     const transporter =nodemailer.createTransport({
//         service:'gmail',
//         auth:{
//             user:EMAIL,
//             pass:EMAIL_PASSWORD
//         }
//     });


//         const mailOptions = {
//             from: EMAIL,
//             to,
//             subject,
//             text,
//             html,
//     }
//     await transporter.sendMail(mailOptions);
        

        
   
// }

export const sendEmail = async ({ to, subject, html, text }) =>{
    console.log(5)
     
    try {
        const transporter = nodemailer.createTransport({
                service:'gmail',
                auth:{
                    user:EMAIL,
                    pass:EMAIL_PASSWORD
                    
                }
                
            });
        console.log(EMAIL)

        const info = await transporter.sendMail({
            from: EMAIL,
            to,
            subject,
            text,
            html,
        });
        console.log("hi")

        console.log('Email sent successfully:', info.messageId);
        
    } catch (error) {
        console.error('Failed to send email:', error.message)
        console.error(error)
    }
}





