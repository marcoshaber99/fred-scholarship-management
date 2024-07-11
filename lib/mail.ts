import { Resend } from "resend";

let resend: Resend | null = null;

const getResendInstance = () => {
  if (!resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("Missing RESEND_API_KEY environment variable");
    }
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
};

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const resendInstance = getResendInstance();
  await resendInstance.emails.send({
    from: "mail@marcohaber.dev",
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resendInstance = getResendInstance();
  const resetLink = `${domain}/auth/new-password?token=${token}`;
  await resendInstance.emails.send({
    from: "mail@marcohaber.dev",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const resendInstance = getResendInstance();
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  await resendInstance.emails.send({
    from: "mail@marcohaber.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};
