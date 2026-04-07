require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend Ledger" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

async function sendRegisterationEmail(userEmail, name) {
  const subject = 'Welcome to Backend Ledger!';
  const text = `Hello ${name},\n\nThank you for registering with Backend Ledger.`;
  const html = `<p>Hello ${name},</p><p>Thank you for registering with Backend Ledger.</p>`;

  await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionEmail(userEmail, name, amount, fromAccount, toAccount) {
  const subject = 'Transaction Successful!';
  const text = `Hello ${name},\n\nYour transaction of amount ${amount} from account ${fromAccount} to account ${toAccount} was successful.`;
  const html = `<p>Hello ${name},</p><p>Your transaction of amount <b>${amount}</b> from account <b>${fromAccount}</b> to account <b>${toAccount}</b> was successful.</p>`;
  await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionFailureEmail(userEmail, name, amount, fromAccount, toAccount, reason) {
  const subject = 'Transaction Failed!';
  const text = `Hello ${name},\n\nYour transaction of amount ${amount} from account ${fromAccount} to account ${toAccount} failed. Reason: ${reason}`;
  const html = `<p>Hello ${name},</p><p>Your transaction of amount <b>${amount}</b> from account <b>${fromAccount}</b> to account <b>${toAccount}</b> failed.</p><p>Reason: ${reason}</p>`;
  await sendEmail(userEmail, subject, text, html);
}


module.exports = { sendEmail, sendRegisterationEmail, sendTransactionEmail, sendTransactionFailureEmail };