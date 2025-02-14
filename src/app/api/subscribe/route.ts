// app/api/subscribe/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { NextRequest } from 'next/server'; // Correct import

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json(); // Parse the JSON body

    // Nodemailer configuration (replace with your email credentials)
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Or your email service (e.g., 'SendGrid', 'Mailgun')
      auth: {
        user: process.env.EMAIL_USER,  // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER, // Your email address (the sender)
      to: process.env.NOTIFICATION_EMAIL, //  Your email address (where YOU want to receive the notification)
      subject: 'New Newsletter Subscription',
      text: `A new user has subscribed to the newsletter: ${email}`,
    };

    // Send email using Nodemailer
    await transporter.sendMail(mailOptions);

    console.log(`Email sent for email: ${email}`);
    return NextResponse.json({ message: 'Subscription successful' }, { status: 200 });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}