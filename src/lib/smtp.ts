import nodemailer from "nodemailer";

// Hostinger SMTP for speaking@alwaysenoughmethod.com — used only for the Speaking Enquiry
// form's staff notification, since MailerLite has no way to email a fixed staff address (its
// automations only email the subscriber who triggered them). Requires SPEAKING_SMTP_HOST/PORT/
// USER/PASSWORD in the environment, never in this repository — see .env.example.
let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (transporter) return transporter;
  const host = process.env.SPEAKING_SMTP_HOST;
  const port = process.env.SPEAKING_SMTP_PORT;
  const user = process.env.SPEAKING_SMTP_USER;
  const pass = process.env.SPEAKING_SMTP_PASSWORD;
  if (!host || !port || !user || !pass) {
    throw new Error("Speaking SMTP is not configured.");
  }
  transporter = nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: { user, pass },
  });
  return transporter;
}

export async function sendSpeakingNotification(params: { subject: string; html: string }): Promise<void> {
  await getTransporter().sendMail({
    from: `"Always ENOUGH™ website" <${process.env.SPEAKING_SMTP_USER}>`,
    to: "speaking@alwaysenoughmethod.com",
    subject: params.subject,
    html: params.html,
  });
}
