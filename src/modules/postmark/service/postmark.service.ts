import { HttpStatus, Injectable } from '@nestjs/common';
import { PostmarkDao } from '../dao/postmark.dao';
import { PostMarkEmail } from '../interface/postmark.interface';

@Injectable()
export class PostmarkService {
  constructor(private readonly postmarkDao: PostmarkDao) {}

  async sendEmail(args: PostMarkEmail) {
    const { to, otp } = args;
    try {
      const client = this.postmarkDao.provideClient();
      const result = await client.sendEmail({
        From: 'support@allofhealth.xyz',
        To: to,
        Subject: 'OTP Verification',
        HtmlBody: `<html> <body> <h1>Your OTP is <strong>${otp}</strong></h1> </body> </html>`,
      });

      if (result.ErrorCode) {
        return {
          success: result.ErrorCode,
          message: 'Something went wrong',
        };
      }

      return {
        success: HttpStatus.OK,
        message: 'Email sent successfully',
      };
    } catch (error) {
      console.error(error);
    }
  }
}
