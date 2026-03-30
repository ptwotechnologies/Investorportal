import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API);
// 🔹 Simplified to just email to avoid Vercel/Resend formatting issues
export const RESEND_FROM = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
export default resend;