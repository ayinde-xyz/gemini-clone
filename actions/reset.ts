"use server";

import React from "react";
import transporter from "@/lib/nodemailer";
import { render } from "@react-email/components";
import Email from "transactional/emails/email";

const styles = {
  container:
    "max-width:500px;margin:20px auto;padding:20px;border:1px solid #ddd;border-radius:6px;",
  heading: "font-size:20px;color:#333;",
  paragraph: "font-size:16px;",
  link: "display:inline-block;margin-top:15px;padding:10px 15px;background:#007bff;color:#fff;text-decoration:none;border-radius:4px;",
};

export async function sendEmailAction({
  to,
  subject,
  description,
  link,
}: {
  to: string;
  subject: string;

  description: string;
  link: string;
}) {
  const emailHtml = await render(
    React.createElement(Email, { description, link }),
  );
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to,
    subject: `Neuralis AI - ${subject}`,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mailOptions);

    return { success: true };
  } catch (err) {
    return { success: false };
  }
}

// `
//     <div style="${styles.container}">
//       <h1 style="${styles.heading}">${subject}</h1>
//       <p style="${styles.paragraph}">${meta.description}</p>
//       <a href="${meta.link}" style="${styles.link}">Click Here</a>
//     </div>
//     `,
