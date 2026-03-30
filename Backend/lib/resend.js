import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API);
export const RESEND_FROM = process.env.RESEND_FROM_EMAIL || "Copteno <onboarding@resend.dev>";
export default resend;