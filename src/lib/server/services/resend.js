import { Resend } from 'resend';
import { env } from '$env/dynamic/private';

export default function getResendClient() {
  const key = (env.RESEND_API_KEY || '').trim();

  if (!key) {
    throw new Error('RESEND_API_KEY is missing in the environment.');
  }

  return new Resend(key);
}