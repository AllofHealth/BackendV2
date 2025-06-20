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
      const result = await client.sendEmailWithTemplate({
        From: 'support@allofhealth.africa',
        To: to,
        TemplateAlias: 'otp-1',
        TemplateModel: {
          otp: otp,
          company_name: 'AllofHealth',
          product_name: 'AllofHealth',
          company_address: 'Victoria Island, Lagos, Nigeria',
        },
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
