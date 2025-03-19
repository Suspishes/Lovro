'use server';

import { Resend } from 'resend';
import ContactEmail from './contact-email';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(prevState: unknown, formData: FormData) {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: [process.env.EMAIL_TO!],
            subject: 'Novo sporočilo s spletne strani',
            react: ContactEmail({
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                phone: formData.get('phone') as string,
                message: formData.get('message') as string,
            }),
        });

        return { success: true };
    } catch (error) {
        console.error(error);
        return { error: 'Napaka pri pošiljanju sporočila' };
    }
}