//7

import {resend} from '@/lib/resend';
import VerificationEmail from '../../emails/verificationEmail';
import { ApiResponse } from '@/types/ApiResponse';


export async function sendVerificationEmails(username: string, email: string, verifyCode: string): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from :'adeebkhan795@gmail.com',
            to:email,
            subject: 'Mystery message | verification code',
            react: VerificationEmail({username, otp: verifyCode}),
        });

        
        return {
            success: true, message: ' verification email sent successfully'
        };

     } catch (errorEmail) {
        console.error('Error sending verification email:', errorEmail);
        return {
            success: false, message: 'Error sending verification email'
        };
    }}