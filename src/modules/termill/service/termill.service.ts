import { HttpStatus, Injectable } from '@nestjs/common';
import { TermillProvider } from '../dao/termill.dao';
import { TermillDataInterface } from '../interface/termill.interface';

@Injectable()
export class TermillService {
  constructor(private readonly termillProvider: TermillProvider) {}

  async sendSMS(data: TermillDataInterface) {
    try {
      const url = this.termillProvider.provideUrl();
      const body = this.termillProvider.constructBody(data);

      console.log(body);

      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res) {
        return {
          success: HttpStatus.BAD_REQUEST,
          message: 'An error occurred while sending the SMS',
        };
      }

      return {
        success: HttpStatus.OK,
        message: 'SMS sent successfully',
        data: res,
      };
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while sending the SMS');
    }
  }
}
