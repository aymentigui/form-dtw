import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  // Configurez ici votre service d'envoi d'emails
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendEmail(to: string, subject: string, html: string) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
    },
  })
}

