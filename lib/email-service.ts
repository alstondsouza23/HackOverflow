// lib/email-service.ts
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const sendUserIdEmail = async (to: string, userId: string) => {
  const msg = {
    to,
    from: 'your-verified-email@yourdomain.com',
    subject: 'Your User ID Information',
    html: `
      <p>Here is your generated user ID:</p>
      <h3>${userId}</h3>
      <p>Keep this ID safe for future reference.</p>
    `,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send user ID email');
  }
};