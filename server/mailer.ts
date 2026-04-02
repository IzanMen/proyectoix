import nodemailer from 'nodemailer';

export function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sanchezginesizan@gmail.com',
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}
